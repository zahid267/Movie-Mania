import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//var axios = require("axios").default;
import axios from 'axios';
import '../css/search.css'
import Auth from '../utils/auth';
import { saveBook, searchMovies, searchMovieImages, searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';

const SearchBooks = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
     // const response = await searchGoogleBooks(searchInput);

      //const response = await searchMovies(searchInput);


    // return fetch('https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/?ProgramType=Movie&Includes=Descriptions,Images,Genres&StringDistance='+searchInput.length+'&Title='+searchInput, {
    //   'method': 'GET',
    //   'headers': {
    //     'content-type': 'application/json',
    //     'x-rapidapi-key': '36cdf6872fmsh4c920891e55aecdp1d76fdjsn61241435d1ec',
    //     'x-rapidapi-host': 'ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com'
    //   }
    // })
    const response = await searchMovies(searchInput)

    if (!response.ok) {
      throw new Error('oh crap')
    }
    //const data = await response.json();
    //console.log(data);
    const {Hits} = await response.json();
    console.log(Hits);
    // .then((response) => {
    //  const data = response.json();
    //  const hits = data && data.hits ? data.hits : [];
    //   console.log(data);
    //  // console.log(data.Promise);
    // })
    // .catch(err => {
    //   console.error(err);

const movieData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

/*
Id: "Episode/991669"
Score: 27.816513
Source:
Created: "2017-03-26T12:22:36.1100000Z"
Deleted: false
EpisodeNumber: 41
Id: "Episode/991669"
ImageCount: 1
Images: Array(1)
0:
FilePath: "ed1d929f7a0b42a67c4e9cc0d4767815"
Height: 1080
ImageType: "Photo"
Modified: "2018-12-20T21:25:34.3370000Z"
Official: false
Sexuality: 1
Tags: ["guitarist"]
Violence: 2
Width: 1920
[[Prototype]]: Object
length: 1
[[Prototype]]: Array(0)
Modified: "2018-02-01T05:26:25.3500000Z"
OriginalReleaseDate: "2015-11-17T00:00:00.0000000Z"
OriginalTitle: "Star Wars"
OriginalTitle_completion: "star wars"
ProgramType: "Episode"
SeasonId: "Season/87384"
SeasonNumber: 4
ShowId: "Show/42645"
TimeStamp: "2021-03-18T04:33:43.4818513Z"
Title: "Star Wars"
Title_completion: "star wars"
VersionId: 752055423
VideoCount: 0
Year: 2015
*/







    // });

      return false;


      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { items } = await response.json();

      console.log(items);
      return false;

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveBook(bookToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <CardColumns>
          {searchedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? (
                  <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(book.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                        ? 'This book has already been saved!'
                        : 'Save this Book!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchBooks;
