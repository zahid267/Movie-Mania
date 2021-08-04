import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
//var axios = require("axios").default;
//import axios from 'axios';
import '../css/search.css'
import Auth from '../utils/auth';
import { searchMovieDetail, searchMovieImages, searchGoogleMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

var movie = {};

var mid = true;

const MovieDetail = () => {
  // create state for holding returned google api data
  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');

  // create state to hold saved MovieId values
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());
  let location = useLocation();
  // set up useEffect hook to save `savedMovieIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // var tid = location.movieId;
  // setSearchInput(tid);
  //console.log("movieId :"+ searchInput);

  // create method to search for Movies and set state on form submit
  const handleFormSubmit = async (movie_id) => {
    // event.preventDefault();

    console.log("mid : " + movie_id);
    setSearchInput(movie_id);

    if (!searchInput) {
      return false;
    }

    try {

      const response = await searchMovieDetail(searchInput);
      //const response = fetch(`http://www.omdbapi.com/?apikey=f3511f7c&type=movie&i=${searchInput}`);
      if (!response.ok) {
        throw new Error('oh crap')
      }
      //const data = await response.json();
      // console.log(response);
      movie = await response.json();

      console.log(movie);


      //  return false;

      mid = false;

      // setSearchedMovies(movieData);
      setSearchedMovies(movie);
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
  if (mid === true) {
    handleFormSubmit(location.movieId);
    return;
  }
  return (
    <>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>
        <CardColumns>

          <Card key={movie.imdbID} border='dark' style={{ width: '40rem' }}>
            {movie.Poster ? (
              <Card.Img src={movie.Poster} alt={`The cover for ${movie.Title}`} variant='top' />
            ) : null}
            <Card.Body>
              <Card.Title>{movie.Title}</Card.Title>
              <p className='small'>Plot: {movie.Plot}</p>
              <p>Genres: {movie.Genre}</p>
              <p>Language: {movie.Language}, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Runtime : {movie.Runtime}</p>
              <p >Rated: {movie.Rated},   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;      Year : {movie.Year}</p>
              <Card.Text>Release Date : {movie.Released}</Card.Text>
              <p>Actors: {movie.Actors}</p>
              <p>Director: {movie.Director}</p>
              <p>Writerr: {movie.Writer}</p>
              <p>Production: {movie.Production}</p>
              {Auth.loggedIn() && (
                <Button
                  disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.imdbID)}
                  className='btn-block btn-info'
                  onClick={() => handleSaveMovie(movie.imdbID)}>
                  {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.imdbID)
                    ? 'This movie has already been saved!'
                    : 'Save this movie!'}
                </Button>
              )}
            </Card.Body>
          </Card>

        </CardColumns>

      </Container>
    </>
  );
};

export default MovieDetail;
