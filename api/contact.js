import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { company, email, type, message, privacy, lang } = req.body;

  // Validation
  if (!company || !email || !message || !privacy) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // 1. Send email to Simon
    await resend.emails.send({
      from: 'Bestcuit Web <onboarding@resend.dev>', // Note: Use your verified domain once set up in Resend
      to: 'simon.moro-devin@bestcuit.fr',
      subject: `[Bestcuit Web] Nouveau message: ${company}`,
      html: `
        <h2>Nouveau message de contact</h2>
        <p><strong>Établissement :</strong> ${company}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Type :</strong> ${type || 'Non spécifié'}</p>
        <p><strong>Message :</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
        <hr />
        <p>Envoyé depuis le site web (${lang || 'fr'})</p>
      `,
    });

    // 2. Send confirmation email to Customer
    const confirmSubject = lang === 'es' 
      ? 'Gracias por contactar con Bestcuit' 
      : 'Merci d\'avoir contacté Bestcuit';
    
    const confirmMessage = lang === 'es'
      ? `<p>Hola,</p><p>Hemos recibido correctamente tu mensaje. Nuestro equipo se pondrá en contacto contigo en un plazo de 24 horas laborables.</p><p>Saludos,<br>El equipo de Bestcuit</p>`
      : `<p>Bonjour,</p><p>Nous avons bien reçu votre message. Notre équipe vous contactera dans les 24 heures ouvrées.</p><p>Cordialement,<br>L'équipe Bestcuit</p>`;

    await resend.emails.send({
      from: 'Bestcuit <onboarding@resend.dev>',
      to: email,
      subject: confirmSubject,
      html: `
        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
          <h2 style="color: #d77d28;">Bestcuit</h2>
          ${confirmMessage}
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
