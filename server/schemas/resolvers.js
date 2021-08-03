const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
    Query: {
        user: async (parent, { username }) => {
            return User.findOne({ username });
        },
        // Get user by the username
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
        
            }
            throw new AuthenticationError('Not logged in');    
        },
    },

    Mutation: {
        // Add user
        addUser: async (parent, {username, email,  password}) => {
            const user = await User.create({username, email, password});
            const token = signToken(user);

            return { token, user };
        },

        // Login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // If no  user withthat email address,
            if (!user) {
                throw new AuthenticationError('No user found with this email address')
            }
            // else if a user is found iwth the email address
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        // Save books
        saveMovie: async (parent, { movieData }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate (
                    { _id: context.user._id },
                    { $addToSet: { savedMovies: movieData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        },

        removeMovie: async (parent, { movieId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndDelete(
                    { _id: context.user._id },
                    { $pull: { savedMovies: { movieId: movieId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in')
        }

    }
};

module.exports = resolvers;