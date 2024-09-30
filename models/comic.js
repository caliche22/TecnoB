const mongoose = require('mongoose');

const ComicSchema = new mongoose.Schema({
  comicId: { type: String, required: true },
  title: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Comic', ComicSchema);
