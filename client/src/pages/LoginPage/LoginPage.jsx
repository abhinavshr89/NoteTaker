import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

// WE NEED TO IMPORT THE ACTIONS AND THE useDispatch and useSelector 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //useSelector is accessing the initial state from the redux store 
  const userLogin =useSelector((state)=>state.userLogin);
  
  // we are taking loading,error,userInfo from the userLogin
  const {loading,error,userInfo} = userLogin;
  
  useEffect(() => {
    // if userInfo is present in the userLogin object 
    // then the user is already present in the local storage
    // it means he is already logged in so we will send him 
    // to the note page 
    if(userInfo){
      navigate('/mynotes');
    }
  }, [userInfo, navigate]);


  const submitHandler = async (e) => {
    e.preventDefault();
    // dispatching the login action to the redux store
    dispatch(login(email,password));
  };
  

  return (
    <>
      <MainScreen title="Login" />
      <Container className="loginContainer">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        
        <Form className="flex flex-col gap-5 h-screen" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-[100px]"
          >
            Submit
          </Button>

          <p>New Customer? <Link to="/register">Register Here</Link></p>
        </Form>
      </Container>
    </>
  );
}

export default LoginPage;
