const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        movieCount: Int
        savedMovies: [Movie]
    }

    type Movie {
        movieId: ID
        year: [Int]
        description: String
        image: String
        link: String
        title: String
    }

    input MovieInput {
        year: [String]
        description: String
        title: String
        movieId: ID
        image: String
        link: String
    }

    type  Query {
        users: [User]
        user(username: String!): User
        me: User
    }

    type Mutation{
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveMovie(movieData: MovieInput!): User
        removeMovie(movieId: ID!): User
    }

    type Auth {
        token: String!
        user: User
    }
`;

module.exports = typeDefs;