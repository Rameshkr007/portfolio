const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  event: { type: String, required: true, trim: true },
  page: { type: String, default: '/' },
  metadata: { type: mongoose.Schema.Types.Mixed, default: {} },
  sessionId: { type: String, default: '' },
  ipAddress: { type: String, default: '' },
  userAgent: { type: String, default: '' }
}, { timestamps: true });

analyticsSchema.index({ event: 1 });
analyticsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Analytics', analyticsSchema);
