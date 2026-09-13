const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const { sendNotificationEmail, sendAcknowledgementEmail } = require('../utils/sendEmail');
const Analytics = require('../models/Analytics');

exports.submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, company, phone, subject, message } = req.body;
    const contactMessage = new ContactMessage({
      name, email, company: company || '', phone: phone || '', subject, message,
      ipAddress: req.ip || '', userAgent: req.headers['user-agent'] || '',
    });
    await contactMessage.save();
    await Analytics.create({ event: 'contact_form_submitted', metadata: { subject }, ipAddress: req.ip || '' });
    Promise.all([
      sendNotificationEmail({ name, email, company, subject, message }).catch(err => console.error('Notification email failed:', err)),
      sendAcknowledgementEmail({ name, email, subject }).catch(err => console.error('Ack email failed:', err)),
    ]);
    return res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
