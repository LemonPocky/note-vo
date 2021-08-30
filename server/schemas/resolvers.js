const { AuthenticationError } = require('apollo-server-express');
const { User, Song, Rating } = require('../models');
const { signToken } = require('../utils/auth');

const { SpotifyClient } = require('../utils/spotifyAPI');

const spotifyClientInstance = new SpotifyClient();

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      const userData = await User.findOne({ username: username })
        .select('-__v -password')
        .populate({
          path: 'ratings',
          populate: 'song',
          options: {
            sort: {
              _id: -1,
            },
          },
        });

      return userData;
    },

    song: async (parent, { songId }) => {
      return Song.findOne({ songId });
    },

    searchSpotify: async (parent, { query }) => {
      const resultObject = await spotifyClientInstance.search(query);
      return JSON.stringify(resultObject);
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    // Adds a rating in the database
    addRating: async (parent, { songId, rating }, context) => {
      if (context.user) {
        const newRating = await Rating.create({
          rating: rating,
          song: songId,
          user: context.user._id,
        });

        return await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { ratings: newRating._id } }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Edit an existing rating in the database
    editRating: async (parent, { ratingId, rating }, context) => {
      if (context.user) {
        const newRating = await Rating.findOneAndUpdate(
          { _id: ratingId },
          { rating: rating }
        );

        if (context.user._id !== newRating.user) {
          throw new AuthenticationError('Not logged in as that user!');
        }

        return newRating;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addSong: async (parent, { song }) => {
      const toReturn = await Song.findOneAndUpdate(
        { songId: song.songId },
        { ...song },
        {
          new: true,
          upsert: true,
        }
      );
      return toReturn;
    },
  },
};

module.exports = resolvers;
