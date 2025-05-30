const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

authorSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

authorSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Author', authorSchema);
