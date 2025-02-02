const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    // By adding context to our query, we can retrieve the logged in user without specifically searching for them
    myMovies: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    saveMovie: async (parent, { movieData }, context) => {
      // If context has a `user` property, that means the user executing this mutation has a valid JWT and is logged in
      if (context.user) {
        return User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedMovies: movieData } },
          { new: true }
        );
      }
      // If user attempts to execute this mutation and isn't logged in, throw an error
      throw new AuthenticationError('You need to be logged in!');
    },
    
    // Make it so a logged in user can only remove a movie from their own saveMovies
    removeMovie: async (parent, { movieId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMovies: { movieId: movieId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    // Make it so a logged in user can only mark a movie as watched from their own saveMovies
    watchedMovie: async (parent, { movieId }, context) => {
      if (context.user) {
       // console.log("in resolver - id : " + movieId);
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { savedMovies: { movieId: movieId } } },{watched : true},  
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
