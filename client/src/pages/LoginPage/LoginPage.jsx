import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate]);








  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      setLoading(true);
      setError(false); // Reset any previous errors
  
      const { data } = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        },
        config
      );
  
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      setError(error.response && error.response.data.message 
        ? error.response.data.message 
        : error.message);
      setLoading(false);
    }
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
