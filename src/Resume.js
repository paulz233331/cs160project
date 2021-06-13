var _ = require('underscore');

module.exports = function() {
  return new Resume();
};

function Resume() {
  // generic resume format
  this.parts = {};
}

Resume.prototype.addKey = function(key, value) {
  value = value || '';
  value = value.trim();
  // reject falsy values
  if (value) {
    if (_.has(this.parts, key)) {
      value = this.parts[key] + value;
    }

    this.parts[key] = value;
  }
};

/**
 *
 * @returns {String}
 */
Resume.prototype.jsoned = function() {
  return JSON.stringify(this.parts);
};