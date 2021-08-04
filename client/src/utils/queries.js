import { gql } from '@apollo/client';

export const GET_ME = gql`
  query myMovies {
    myMovies {
      _id
      username
      email
      savedMovies{
        movieId
        title
        image
        year
      }
    }
  }
`;
