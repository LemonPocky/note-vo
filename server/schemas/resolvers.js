const { User, Review } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { param } = require('../routes');

const resolvers = {

    Query: {
        me: async (parent, args, context) => {
            if(context.user) {
                const userData = await User.findOne({})
                .select('-__v -password')
                .populate('songs')
                return userData;
            }
            throw new AuthenticationError('Auth error: not logged in.')
        },

    },

    Mutation: {

        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {token, user};
        },

        login: async (parent, {email, password}) => {

            const user = await User.findOne({email});

            if(!user) {
                throw new AuthenticationError('Provided Username and/or Password are incorrect.');
            }

            const passCorrect = await user.isCorrectPassword(password);

            if(!passCorrect) {
                throw new AuthenticationError('Provided Username and/or Password are incorrect.');
            }

            const token = signToken(user);
            return {token, user};
        },

        saveReview: async (parent, args, context) => {

            if (context.user) {
          
             const updateUser =  await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedReviews: args.input } },
                { new: true }
              );
          
            return updateUser;
            }
          
            throw new AuthenticationError('You need to be logged in!');
        },
    }
};

module.exports = resolvers;