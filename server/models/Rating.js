const { Schema, model } = require('mongoose');

const RatingSchema = new Schema({
  rating: {
    type: Number,
  },
  // The Song this rating belongs to
  song: {
    type: Schema.Types.ObjectId,
    ref: 'Song',
  },
  // The User that generated this rating
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Rating = model('Rating', RatingSchema);

module.exports = Rating;
