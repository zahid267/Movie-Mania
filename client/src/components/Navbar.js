import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import '../css/navbar.css'
import MovieView from '../pages/MovieView';

import Auth from '../utils/auth';

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  // auto=compress&cs=tinysrgb&h=350

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container className="navbar" style={{  
  backgroundImage: "url(" + "https://images.pexels.com/photos/34156/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=100&w=2000/" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat'
}} >
          {/* <Button className = 'bored'>I'm Bored</Button> */}
    
          <Navbar.Brand as={Link} to='/'>
          <h6 style= {{color:'white'}}> Welcome to Moviemania: The home of entertainments </h6>
           </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mr-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

              <Nav.Link href="/" style= {{color:'white'}}>Home</Nav.Link>
              <Nav.Link href="movies" style= {{color:'white'}}>Movies</Nav.Link>
              {/* <Nav.Link href="tvshows"> Tv Shows </Nav.Link> */}
              <Nav.Link href="watched" style= {{color:'white'}}>Watched</Nav.Link>
              <Nav.Link href="wishlist" style= {{color:'white'}}>Wishlist</Nav.Link>
              {/* <NavDropdown title="Genre" id="navbarScrollingDropdown"> */}
                {/* <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Adventure</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Comedy</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Fantsy</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Sci-Fiction</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Romance</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Crime/Mystery</NavDropdown.Item>
                <NavDropdown.Item href="#action3">Horror</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Thriller</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Western</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Animation</NavDropdown.Item> */}
                <NavDropdown.Divider />
        
              {/* </NavDropdown> */}

                         
              {Auth.loggedIn() ? (
                <>
                  
              <Nav.Link href="/saved" style= {{color:'white'}}>My Movies</Nav.Link>

                  <Nav.Link onClick={Auth.logout} style= {{color:'white'}}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)} style= {{color:'white'}}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="mr-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Go</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className="header-signup" closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item  >
                  <Nav.Link className="signup-text" eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link className="signup-text" eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content >
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
