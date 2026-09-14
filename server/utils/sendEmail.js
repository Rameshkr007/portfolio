const nodemailer = require('nodemailer');

const createTransporter = () => {
  const port = parseInt(process.env.EMAIL_PORT) || 465;
  const secure = port === 465;
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: port,
    secure: secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.replace(/\s+/g, '') : '',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};

exports.sendNotificationEmail = async ({ name, email, company, subject, message }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.CONTACT_EMAIL,
    subject: `[Portfolio] New Message: ${subject}`,
    html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0e1a;color:#f1f5f9;padding:30px;border-radius:12px;"><h2 style="color:#3b82f6;">New Portfolio Message</h2><p><strong>From:</strong> ${name} (${email})</p>${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}<p><strong>Subject:</strong> ${subject}</p><div style="background:#111827;padding:20px;border-radius:8px;border-left:4px solid #3b82f6;">${message.replace(/\n/g, '<br>')}</div></div>`,
  });
};

exports.sendAcknowledgementEmail = async ({ name, email, subject }) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: `"Ramesh Kumar Thakur" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Thank you for reaching out, ${name}!`,
    html: `<div style="font-family:Arial;max-width:600px;margin:0 auto;background:#0a0e1a;color:#f1f5f9;padding:30px;border-radius:12px;"><h2 style="color:#3b82f6;">Hi ${name},</h2><p>Thank you for reaching out! I received your message about <strong>${subject}</strong> and will get back to you soon.</p><p>Best regards,<br><strong>Ramesh Kumar Thakur</strong><br>Full-Stack Web Developer</p></div>`,
  });
};