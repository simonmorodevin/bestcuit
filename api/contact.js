import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Basic in-memory rate limiting (Note: resets on function cold start)
const rateLimit = new Map();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // 5 requests per hour per IP

/**
 * Basic HTML Escaping to prevent XSS
 */
function escapeHTML(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req, res) {
  // Configuración de CORS más robusta
  res.setHeader('Access-Control-Allow-Origin', '*'); 
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Manejo de la petición "preflight" OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 1. Basic Rate Limiting check
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const now = Date.now();
  const userRate = rateLimit.get(ip) || { count: 0, startTime: now };

  if (now - userRate.startTime > RATE_LIMIT_WINDOW) {
    userRate.count = 1;
    userRate.startTime = now;
  } else {
    userRate.count++;
  }
  rateLimit.set(ip, userRate);

  if (userRate.count > MAX_REQUESTS) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  const { company, email, type, message, privacy, lang, website } = req.body;

  // 2. Honeypot check (website field should be empty)
  if (website) {
    console.warn('Bot detected by honeypot field');
    return res.status(200).json({ success: true, message: 'Message "sent" successfully' }); // Silent fail for bots
  }

  // 3. Validation & Sanitization
  if (!company || !email || !message || !privacy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Payload size constraints (simple DoS protection)
  if (company.length > 100 || message.length > 2000) {
    return res.status(400).json({ error: 'Input too long' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Sanitize for XSS and general injection prevention
  const cleanCompany = escapeHTML(company);
  const cleanMessage = escapeHTML(message);
  const cleanType = escapeHTML(type);

  try {
    // 4. Send email to Simon
    await resend.emails.send({
      from: 'Bestcuit Web <contact@bestcuit.fr>',
      to: 'simon.moro-devin@bestcuit.fr',
      subject: `[Bestcuit Web] Nouveau message: ${cleanCompany}`,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5;">
          <h2 style="color: #2A1808; border-bottom: 2px solid #d77d28; padding-bottom: 10px;">Nouveau message de contact</h2>
          <p><strong>Établissement :</strong> ${cleanCompany}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Type :</strong> ${cleanType || 'Non spécifié'}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f9f4ef; padding: 20px; border-radius: 8px; border-left: 4px solid #d77d28;">
            <p style="white-space: pre-wrap; margin: 0;">${cleanMessage}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 0.8rem; color: #666;">Envoyé depuis le site web (${lang || 'fr'}) | IP: ${ip}</p>
        </div>
      `,
    });

    // 5. Send confirmation email to Customer
    const confirmSubject = lang === 'es'
      ? 'Gracias por contactar con Bestcuit'
      : 'Merci d\'avoir contacté Bestcuit';

    const confirmMessage = lang === 'es'
      ? `<p>Hola,</p><p>Hemos recibido correctamente tu mensaje. Nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas laborables.</p><p>Saludos,<br><strong>El equipo de Bestcuit</strong></p>`
      : `<p>Bonjour,</p><p>Nous avons bien reçu votre message. Notre équipe vous contactera dans les 24 heures ouvrées.</p><p>Cordialement,<br><strong>L'équipe Bestcuit</strong></p>`;

    await resend.emails.send({
      from: 'Bestcuit <contact@bestcuit.fr>',
      to: email,
      subject: confirmSubject,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #f0f0f0; border-radius: 12px; overflow: hidden;">
          <div style="background: #2A1808; padding: 30px; text-align: center;">
            <h1 style="color: #f4dac3; margin: 0; font-size: 24px;">BESTCUIT</h1>
          </div>
          <div style="padding: 40px;">
            ${confirmMessage}
          </div>
          <div style="background: #fdfaf7; padding: 20px; text-align: center; font-size: 0.8rem; color: #999;">
            <p>© 2024 BESTCUIT. Tous droits réservés / Todos los derechos reservados.</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
