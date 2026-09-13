const ContactMessage = require('../models/ContactMessage');
const Analytics = require('../models/Analytics');

exports.getMessages = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (status && status !== 'all') query.status = status;
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { subject: { $regex: search, $options: 'i' } }];
    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    const counts = {
      total: await ContactMessage.countDocuments(),
      new: await ContactMessage.countDocuments({ status: 'new' }),
      read: await ContactMessage.countDocuments({ status: 'read' }),
      replied: await ContactMessage.countDocuments({ status: 'replied' }),
      archived: await ContactMessage.countDocuments({ status: 'archived' }),
    };
    return res.status(200).json({ success: true, messages, total, counts, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found.' });
    if (message.status === 'new') { message.status = 'read'; await message.save(); }
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['new', 'read', 'replied', 'archived'].includes(status)) return res.status(400).json({ success: false, message: 'Invalid status.' });
    const message = await ContactMessage.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!message) return res.status(404).json({ success: false, message: 'Message not found.' });
    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ success: false, message: 'Message not found.' });
    return res.status(200).json({ success: true, message: 'Message deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const totalVisits = await Analytics.countDocuments({ event: 'page_visit' });
    const totalContacts = await Analytics.countDocuments({ event: 'contact_form_submitted' });
    const totalProjectViews = await Analytics.countDocuments({ event: 'project_opened' });
    const totalResumeClicks = await Analytics.countDocuments({ event: 'resume_download' });
    const eventCounts = await Analytics.aggregate([{ $group: { _id: '$event', count: { $sum: 1 } } }, { $sort: { count: -1 } }]);
    const recentEvents = await Analytics.find().sort({ createdAt: -1 }).limit(50);
    return res.status(200).json({ success: true, analytics: { totalVisits, totalContacts, totalProjectViews, totalResumeClicks, eventCounts, recentEvents } });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.' });
  }
};
