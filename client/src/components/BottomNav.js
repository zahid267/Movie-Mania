import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import ContactUs from './ContactUs';
import '../css/navbar.css'
import Auth from '../utils/auth';

const BottomNav = () =>{
    const [showModal, setShowModal] = useState(false);

return(

<Navbar style={{marginTop: 120}}>
  <Container>
    <Button className = 'bored'>I'm bored</Button>
    <Navbar.Brand href="#"> Home </Navbar.Brand>
    <Navbar.Brand href="#"> Movies </Navbar.Brand>
    <Navbar.Brand href="#"> Tv Shows </Navbar.Brand>
    <Navbar.Brand href="#"> Genre </Navbar.Brand>
    <Navbar.Brand href="#"> Login/Sign Up </Navbar.Brand>
    <NavDropdown.Divider />
    <NavDropdown>
                <NavDropdown.Item href="#action5">I am Bored</NavDropdown.Item>
              </NavDropdown>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
        Signed in as: <a href="#login">Mark Otto</a>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
)}



export default BottomNav;