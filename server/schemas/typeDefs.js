const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    movieCount: Int
    savedMovies: [Movie]
  }

  type Auth {
    token: ID!
    user: User
  }

  input MovieInput {
    movieId: String!
    type: String
    title: String!
    image: String
    year: String!
    
  }
  
  type Movie {
    movieId : String!
    type: String
    title : String!
    image : String
    year : String
    watched: Boolean
  }

  type Query {
    users: [User]
    user(_id: ID!): User
    # Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data
    myMovies: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): User
    removeMovie(movieId: ID!): User
    watchedMovie(movieId: ID!): User
  }
`;

module.exports = typeDefs;
