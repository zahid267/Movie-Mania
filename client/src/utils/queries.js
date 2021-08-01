import { gql } from '@apollo/client';
 
export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedMovies {
                movieId
                year
                image
                description
                title
                link
            }
        }
    }
`;   

export const QUERY_USER = gql`
    query user ($username: String!) {
        user (username: $username) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
                link
            }
        }
    }
`;   

export const QUERY_BOOKS = gql`
    query getBooks {
        savedBooks {
            bookId
            authors
            image
            description
            title
            link
            
        }
    }
`;   