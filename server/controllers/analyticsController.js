const Analytics = require('../models/Analytics');
exports.trackEvent = async (req, res) => {
  try {
    const { event, page, metadata, sessionId } = req.body;
    if (!event) return res.status(400).json({ success: false, message: 'Event name required.' });
    await Analytics.create({ event, page: page || '/', metadata: metadata || {}, sessionId: sessionId || '', ipAddress: req.ip || '', userAgent: req.headers['user-agent'] || '' });
    return res.status(201).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Failed to track event.' });
  }
};
