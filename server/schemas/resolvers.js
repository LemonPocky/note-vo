const { AuthenticationError } = require("apollo-server-express");
const { User, Song, Rating } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {},

    user: async (parent, { username }) => {},

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
        throw new AuthenticationError("No user found with this email address");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },

    addRating: async (parent, { songId, rating }, context) => {},

    addSong: async (parent, args) => {},
  },
};

module.exports = resolvers;
