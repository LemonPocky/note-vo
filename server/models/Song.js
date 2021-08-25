const { Schema, model } = require('mongoose');

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
});

const Song = model('Song', SongSchema);

module.exports = Song;
