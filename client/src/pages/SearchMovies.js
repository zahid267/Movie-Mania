import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 

import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//var axios = require("axios").default;
//import axios from 'axios';
import '../css/search.css'
import Auth from '../utils/auth';
import { searchMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

// new lines
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { SAVE_MOVIE } from '../utils/mutations';
// new lines end

const SearchMovies = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved MovieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  //new lines
  // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
  const [saveMovie] = useMutation(SAVE_MOVIE);
  // new lines end

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
  //  console.log(response);
    const { Search } = await response.json();   /// "Search" is the inner object inside the returned respobse object
  //  console.log(Search)
    

    const movieData = Search.map((movie) => ({
      movieId: movie.imdbID,
      type : movie.Type,
     // genre : movie.Genre || '',
     // rated: movie.Rated,
      title: movie.Title,
      //language : movie.Language || 'English',
      //runtime : movie.Runtime || 1,
      //released : movie.Released,
      // year: Number(movie.Year),
      year: movie.Year,
      //director: movie.Director || '',
      //writer: movie.Writer || '',
      //actors : movie.Actors,
      //plot : movie.Plot,
      //country : movie.Country,
      //awards : movie.Awards || '',
      image : movie.Poster,
      //production : movie.Production
    }));

  // console.log(movieData)

//return false;

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
    //console.log("token :" + token);

    if (!token) {
      return false;
    }
    //console.log("movieId : " + movieId);
   // console.log("tosave-rec: " + movieToSave.movieId+ " - " +movieToSave.title+ " - " +movieToSave.image+ " - " +movieToSave.year);

    try {
      //const response = await saveMovie(movieToSave, token);
      const { data } = await saveMovie({
        variables:{ movieData: {...movieToSave} },
      });

     // if (!response.ok) {
      if (!data) {
        throw new Error('something went wrong while saving movie!');
      }
      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Jumbotron fluid className='text-light bg-info'>
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
              <Card className="card" key={movie.movieId} border='dark'>
                {movie.image ? (
                  <Card.Img className="image" src={movie.image} alt={`The cover for ${movie.title}`} variant='top' />
                ) : null}
                <Card.Body>
                  <Card.Title className="movietitle">{movie.title}</Card.Title>   
                  <p className='small'>  Year : {movie.year}</p>
                  
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
                <Button className="readmorebtn">
                    <Link className="link" to={{pathname: `/detail/${movie.movieId}`}} >Read More</Link>
                    </Button> 
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SearchMovies;
