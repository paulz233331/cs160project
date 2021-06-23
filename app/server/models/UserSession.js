const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    userId: Number,
    default: -1
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  
});

module.exports = mongoose.model('UserSession', UserSessionSchema);