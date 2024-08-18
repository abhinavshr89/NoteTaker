import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <>
     <MainScreen title="Register" />
      <Container className="loginContainer">
       
        
        <Form className="flex flex-col gap-5 h-screen" >
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
             
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              
            />
          </Form.Group>

          <Form.Group controlId="pic">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              
             
              
            />
          </Form.Group>
          

          <Button
            variant="primary"
            type="submit"
            className="w-[100px]"
          >
            Submit
          </Button>

          <p>Already have an account ? <span className='text-blue-500'><Link to="/login">Login here</Link></span></p>
        </Form>
      </Container>
    </>
  )
}

export default RegisterPage