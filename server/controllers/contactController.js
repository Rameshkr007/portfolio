let axios;
try { axios = require('axios'); } catch (e) { axios = null; }
const { validationResult } = require('express-validator');
const ContactMessage = require('../models/ContactMessage');
const Analytics = require('../models/Analytics');

exports.submitContact = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    const { name, email, company, phone, subject, message } = req.body;
    
    // Save to MongoDB
    const contactMessage = new ContactMessage({
      name, email, company: company || '', phone: phone || '', subject, message,
      ipAddress: req.ip || '', userAgent: req.headers['user-agent'] || '',
    });
    await contactMessage.save();
    await Analytics.create({ event: 'contact_form_submitted', metadata: { subject }, ipAddress: req.ip || '' });

    // Send email via HTTPS Web3Forms (bypasses Render SMTP port blocking)
    const apiKey = process.env.WEB3FORMS_KEY || 'fae61cb6-5fa4-4fef-a678-bf5b9f9e31d4';
    const payload = {
      access_key: apiKey,
      name: name,
      email: email,
      subject: `[Portfolio Contact] ${subject}`,
      message: `From: ${name} (${email})\nCompany: ${company || 'N/A'}\n\nMessage:\n${message}`,
      from_name: 'Portfolio Contact Form'
    };

    try {
      if (axios) {
        await axios.post('https://api.web3forms.com/submit', payload);
      } else if (typeof fetch !== 'undefined') {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
    } catch (eErr) {
      console.warn('Web3Forms notification error:', eErr.message);
    }

    return res.status(201).json({ success: true, message: 'Message received! I will get back to you soon.' });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};

