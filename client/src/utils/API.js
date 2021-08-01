// route to get logged in user's info (needs the token)
export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

// save movie data for a logged in user
export const saveMovie = (movieData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  });
};

// remove saved movie data for a logged in user
export const deleteBook = (movieId, token) => {
  return fetch(`/api/users/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

// make a search to google books api
// https://www.googleapis.com/books/v1/volumes?q=harry+potter
export const searchGoogleBooks = (query) => {
  return fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
};
/*
export const searchMovies = (query) => {
ages,Genres&StringDistance=0&Title='+query, {

  return fetch('https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/?ProgramTypes=Movie&Includes=Descriptions,Images,Genres&Title='+query, {
 main
      'method': 'GET',
      'headers': {
        'content-type': 'application/json',
        'x-rapidapi-key': '36cdf6872fmsh4c920891e55aecdp1d76fdjsn61241435d1ec',
        'x-rapidapi-host': 'ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com'
      }
    });
};

export const searchMovieImages = (imagepath) => {
  return fetch('https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/Images/'+imagepath+'/Redirect?Redirect=True', {
      'method': 'GET',
      'headers': {
        'content-type': 'application/json',
        'x-rapidapi-key': '36cdf6872fmsh4c920891e55aecdp1d76fdjsn61241435d1ec',
        'x-rapidapi-host': 'ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com'
      }
    });
};*/
 /// does not work
export const searchMovies = (query) => {
  return fetch(`http://www.omdbapi.com/?apikey=f3511f7c&type=movie&s=${query}`);
};
export const searchMovieDetail = (query) => {
  return fetch(`http://www.omdbapi.com/?apikey=f3511f7c&type=movie&i=${query}`);
};

///// sample url  = http://www.omdbapi.com/?i=tt3896198&apikey=f3511f7c     /// i=xxx, i for movieid