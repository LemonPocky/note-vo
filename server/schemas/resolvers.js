const { AuthenticationError } = require('apollo-server-express');
const { User, Song, Rating } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      const userData = await User.findOne({ username: username })
        .select('-__v -password')
        .populate({
          path: 'ratings',
          populate: 'song',
        });

      return userData;
    },

    song: async (parent, { songId }) => {
      return Song.findOne({ songId });
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

        newRating.user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { ratings: newRating._id } }
        );

        newRating.song = await Song.findById(songId);
        return newRating;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addSong: (parent, args) => {
      return Song.create({ ...args.song });
    },
  },
};

module.exports = resolvers;
