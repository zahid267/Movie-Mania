import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/homeview.css'

const HomeView = () => {
  return (
    <Carousel className="viewed-imgs">
      <Carousel.Item interval={2000}>
        <a href="https://www.pexels.com">
          <img src="https://images.pexels.com/photos/2014422/pexels-photo-2014422.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000" />
        </a>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <a href="https://www.pexels.com">
          <img src="https://images.pexels.com/photos/34154/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000"/>
        </a>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <a href="https://www.pexels.com">
          <img src="https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000"/>
        </a>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <a href="https://www.pexels.com">
          <img src="https://images.pexels.com/photos/34159/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000"/>
        </a>
      </Carousel.Item>

      <Carousel.Item interval={2000}>
        <a href="https://www.pexels.com">
          <img src="https://images.pexels.com/photos/34155/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000" />
        </a>
      </Carousel.Item>
    </Carousel>
  );
};


export default HomeView;