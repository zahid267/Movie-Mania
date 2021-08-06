import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($movieData: MovieInput!) {
      saveMovie(movieData: $movieData) {   
        _id
        username
        email
        savedMovies {
          movieId
          type
          title
          image
          year
          
        }
      }
  }
`;
export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: ID!) {
      removeMovie(movieId:$movieId) {
        _id
        username
        email
        savedMovies {
          movieId
          title
          image
          year
        }
      }
  }
`;
export const WATCHED_MOVIE = gql`
  mutation watchedMovie($movieId: ID!) {
      watchedMovie(movieId:$movieId) {
        _id
        username
        email
        savedMovies {
          movieId
          title
          image
          year
          watched
        }
      }
  }
`;