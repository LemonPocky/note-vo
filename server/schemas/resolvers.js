const { AuthenticationError } = require('apollo-server-express');
const { ValidatorError } = require('mongoose');
const { User, Song, Rating } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {},

    user: async (parent, { username }) => {
      const userData = await User.findOne({ username: username }).select(
        '-__v -password'
      );

      return userData;
    },

    song: async (parent, { songId }) => {},
  },

  Mutation: {
    addUser: async (parent, args) => {},

    login: async (parent, { username, password }) => {},

    // Adds a rating in the database
    addRating: async (parent, { songId, rating }, context) => {
      if (context.user) {
        const newRating = await Rating.create({
          rating: rating,
          song: songId,
          user: context.user._id,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { ratings: newRating._id } }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    addSong: (parent, args) => {
      return Song.create({ ...args });
    },
  },
};

module.exports = resolvers;
