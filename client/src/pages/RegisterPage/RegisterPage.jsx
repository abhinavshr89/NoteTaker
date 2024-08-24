import React, { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useDispatch } from 'react-redux';

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);

  const dispatch = useDispatch();

  
  const userRegister = useSelector(state =>state.userRegister);
  
  const{loading,error,userInfo}=userRegister;

  const navigate = useNavigate();
  useEffect(()=>{
    if(userInfo){
      navigate('/mynotes');
    }  
  },[navigate,userInfo])

  const submitHandler = async (e) => {
    e.preventDefault();
    if(password !== confirmPassword){
      setMessage("Passwords do not match");
    }else{
      dispatch(register(name,email,password,picture));
    }

  };

  const postDetails = (file) => {
    if (!file) {
      return setPicMessage('Please select an image');
    }

    setPicMessage(null);

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'notezipper');  // This should match the preset configured in Cloudinary
      data.append('cloud_name', 'donhwxksm');  // Replace with your Cloudinary cloud name

      fetch('https://api.cloudinary.com/v1_1/donhwxksm/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          setPicture(data.url.toString()); // Set the picture state to the URL returned from Cloudinary
        })
        .catch((err) => {
          setPicMessage('Error Uploading Image');
        });
    } else {
      setPicMessage('Please select a JPEG or PNG image');
    }
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    postDetails(file);
  };

  return (
    <>
      <MainScreen title="Register" />
      <Container className="loginContainer">
        {loading && <Loading />}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        <Form onSubmit={submitHandler} className="flex flex-col gap-5 h-screen">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
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

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>}

          <Form.Group controlId="pic">
            <Form.Label>Upload Profile Picture</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handlePictureUpload} // Pass the event to handlePictureUpload
            />
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="w-[100px]"
          >
            Submit
          </Button>

          <p>Already have an account? <span className='text-blue-500'><Link to="/login">Login here</Link></span></p>
        </Form>
      </Container>
    </>
  );
}

export default RegisterPage;
