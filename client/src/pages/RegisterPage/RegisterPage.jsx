import  { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  const userRegister = useSelector(state => state.userRegister);

  const { loading, error, userInfo } = userRegister;

  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate('/mynotes');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(register(name, email, password, picture));
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
      data.append('upload_preset', 'notezipper');
      data.append('cloud_name', 'donhwxksm');

      fetch('https://api.cloudinary.com/v1_1/donhwxksm/image/upload', {
        method: 'POST',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPicture(data.url.toString());
        })
        .catch(() => {
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
    <div className="flex flex-col items-center justify-center relative min-h-screen bg-[#0a091b] z-0 text-white">
      <div
        className="
          absolute
          left-0 bottom-10
          w-[10%] h-72
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <div
        className="
          absolute
          top-[30%]
          w-[70%] h-72
          bg-radial-gradient
          from-gradientStart
          to-gradientEnd
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <MainScreen title="Register" />
      <Container className="loginContainer z-10">
        {loading && <Loading />}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}

        <Form onSubmit={submitHandler} className="flex flex-col gap-5">
          <Form.Group controlId="name">
            <Form.Label className="text-white">Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label className="text-white">Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="text-white">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label className="text-white">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}

          <Form.Group controlId="pic">
            <Form.Label className="text-white">Upload Profile Picture</Form.Label>
            <Form.Control 
              type="file" 
              onChange={handlePictureUpload}
            />
          </Form.Group>

          <button
            
            type="submit"
            className="bg-[#5c3d8f] text-white py-2 px-6 rounded-lg hover:bg-[#5c3d8f]"
          >
            Submit
          </button>

          <p className="text-white">
            Already have an account? <span className="text-blue-500"><Link to="/login">Login here</Link></span>
          </p>
        </Form>
      </Container>
    </div>
  );
};

export default RegisterPage;
