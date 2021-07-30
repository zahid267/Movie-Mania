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
      return;
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

      // const imp = 'da7c56710066a8880f8a38be739742bb'



      // const responseimg = await searchMovieImages(imp)
      // console.log('hiii',responseimg)
      // if (!responseimg.ok) {
      //   throw new Error('oh crap')

      // }






      const response = await searchMovies(searchInput)


      //const data = await response.json();
      //console.log(data);
      const { ProgramMatches } = await response.json();

      // console.log(ProgramMatches.Image);



      const movieDataArr = await ProgramMatches.map((movie) => ({
        Id: movie.Id,
        programType: movie.ProgramType,
        Type: movie.Type,
        Year: movie.Year,
        OriginalLanguage: movie.OriginalLanguage,
        Title: movie.Title,
        Runtime: movie.Runtime,
        OfficialSiteUrl: movie.OfficialSiteUrl,
        Status: movie.Status,
        Releases: movie.Releases[0].Type, //need to map this Data = Certification,CountryName,Type
        Contributors: movie.Contributors[1], //need to map this Data = PersonName,Character,Job
        Descriptions: movie.Descriptions[1], //need to map this Data = Description,Attribution,Language
        IvaRating: movie.IvaRating,
        Summary: movie.Summary.Image.FilePath, // map[Video]map Title,Type,[ScreenCaptures]map Filepath
        // map[Image] Id,Filepath, ImageType    
        Images: movie.Summary.Image
      }));



      if (movieDataArr) {

        setSearchedBooks(movieDataArr);
      }
      // let myImageUrl = ''
      // const myMovie = await movieDataArr.pop();
      // // your function will start here
      // const myImage = await myMovie.Summary;

      // if (myImage && myImage.length > 0) {
      //   const imageResponse = await searchMovieImages(myImage)
      //   myImageUrl = imageResponse && imageResponse.url ? imageResponse.url : '';
      //   console.log(imageResponse.url)
      // }
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  function getImageUrl(movieImg) {
    
   
    if (movieImg) {
      const response = searchMovieImages(movieImg);
      return response && Response.url ? Response.url : '';
    
    } else {
      
      console.log(Response.url)
      return '';
      console.log(Response.url)
    }
    console.log(Response.url)
  }


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

          {searchedBooks.map((movie) => {


            return (
              <Card key={movie.Id} border='dark'>
                {movie.Summary && movie.Title ? (

                  <Card.Img src={getImageUrl(movie.Summary)} alt={`The cover for ${movie.Title}`} variant='top' />
                ) : null}

                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <p className='small'>Program Type: {movie.Type}</p>
                  <Card.Text>
                    <p className='small'>Year: {movie.Releases}</p>
                    <Card.Text>
                      <p className='small'>Rating: {movie.Summary}</p>
                    </Card.Text>
                  </Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedBookIds?.some((savedBookId) => savedBookId === movie.bookId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveBook(movie.bookId)}>
                      {savedBookIds?.some((savedBookId) => savedBookId === movie.bookId)
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
