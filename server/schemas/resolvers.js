const { AuthenticationError } = require('apollo-server-express');
const { User, Song, Rating } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {},

    user: async (parent, { username }) => {},

    song: async (parent, { songId }) => {},
  },

  Mutation: {
    addUser: async (parent, args) => {},

    login: async (parent, { username, password }) => {},

    addRating: async (parent, { songId, rating }, context) => {},

    addSong: async (parent, args) => {},
  },
};

module.exports = resolvers;
