import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//var axios = require("axios").default;
//import axios from 'axios';
import '../css/search.css'
import Auth from '../utils/auth';
import { searchMovies, searchMovieImages, searchGoogleMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved MovieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for Movies and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
     
    const response = await searchMovies(searchInput)

    if (!response.ok) {
      throw new Error('oh crap')
    }
    //const data = await response.json();
    console.log(response);
    const {Hits} = await response.json();
  //  console.log(Hits);
   

const movieData = Hits.map((movie) => ({
        movieId: movie.Id,
        programType : movie.Source.ProgramType,
        genres : movie.Source.Genres || '',
        imageCount:movie.Source.ImageCount,
        title: movie.Source.Title,
        language : movie.Source.OriginalLanguage || 'English',
        runtime : movie.Source.Runtime || 1,
        releaseDate : (movie.Source.OriginalReleaseDate).slice(0,10),
        year : movie.Source.Year,
        imageFilePath: movie.Source.Images[0].FilePath || '',
        sexuality:movie.Source.Images[0].Sexuality || 0,
        image : ''
       // image: searchMovieImages(movie.Source.Images[0].FilePath)

      }));
  console.log(movieData);
/*const imageFilePath= '467313f11888e53b719d66eacee61db1';
const imageResp= await searchMovieImages(imageFilePath);
console.log(imageResp);
const url = await imageResp.json();
console.log(url);
*/
   //   return false;


      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a Movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
/*
    try {
      const response = await saveMovie(movieToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }*/
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Search for movies!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a movie'
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
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>
          {searchedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Genres: {movie.genres}</p>
                  <p className='small'>Language: {movie.language},   Runtime : {movie.runtime}</p>
                  <p className='small'>Sexuality: {movie.sexuality},         Year : {movie.year}</p>
                  <Card.Text>Release Date : {movie.releaseDate}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this movie!'}
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

export default SearchMovies;
