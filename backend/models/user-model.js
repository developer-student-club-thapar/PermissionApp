const mongoose = require('mongoose');
const uniquevalidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  Name: { type: String, required: true },
  Email_id: { type: String, required: true, unique: true },
  Roll_No: { type: String, required: true, unique: true },
  Room_No: { type: String, required: true },
  Password: { type: String, required: true, minlength: 6 },
  Permis: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: [
        'LateEntrypermi',
        'Librarypermi',
        'Societypermi',
        'EarlyLeavepermi',
      ],
    },
  ],
  category: { type: String, required: true },
});
userSchema.plugin(uniquevalidator);
module.exports = mongoose.model('User', userSchema);
