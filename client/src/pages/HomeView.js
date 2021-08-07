import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/homeview.css'

const HomeView = () => {
  return (
    <Carousel className="viewed-imgs">
      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450_1280.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Movie Mania</h3>
          <p>Entertainment Unplugged...</p>
        </Carousel.Caption>
      </Carousel.Item>

       <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2016/04/14/13/06/landscape-1328858_1280.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h3>Movie Mania</h3>
          <p>Rediscover entertainment in a new dimension</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2017/09/04/09/37/cinema-strip-2713352_1280.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Movie Mania</h3>
          <p>Entertainment at your doorstep</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <img
          className="d-block w-100"
          src="https://cdn.pixabay.com/photo/2017/09/04/09/37/cinema-strip-2713352_1280.jpg"
          alt="Fourth slide"
        />
        <Carousel.Caption>
          <h3>Movie Mania</h3>
          <p>Entertainment at your doorstep</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
};


export default HomeView;