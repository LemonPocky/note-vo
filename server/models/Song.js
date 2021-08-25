const { Schema, model } = require('mongoose');
const dayjs = require('dayjs');

const SongSchema = new Schema({
  // spotify id
  songId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  // There can be one or more artists on a song
  artists: [
    {
      type: String,
    },
  ],
  album: {
    title: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  // Link to song on open.spotify.com
  link: {
    type: String,
  },
  // Link to 30s preview
  previewUrl: {
    type: String,
  },
  // If data is expired, it should be refetched from spotify
  expiration: {
    type: Date,
  },
});

// Creates a virtual to retrieve ratings for this songId
// To get these ratings, use populate('ratings')
SongSchema.virtual('ratings', {
  ref: 'Rating',
  localField: 'songId',
  foreignField: 'song',
});

// middleware to set expiration date when saved
SongSchema.pre('save', async function (next) {
  // Set expiration to one week from now and conver to Javascript Date
  this.expiration = dayjs().add(1, 'week').toDate();
  next();
});

// middleware to set expiration date when updated
SongSchema.pre('updateOne', async function (next) {
  // Set expiration to one week from now and conver to Javascript Date
  this.expiration = dayjs().add(1, 'week').toDate();
  next();
});

const Song = model('Song', SongSchema);

module.exports = Song;
