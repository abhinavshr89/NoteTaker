import { useEffect, useState } from 'react';
import MainScreen from '../../components/MainScreen';
import { Form, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; // Import icons

// WE NEED TO IMPORT THE ACTIONS AND THE useDispatch and useSelector 
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
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
    <div className="flex text-white flex-col items-center justify-center relative min-h-screen bg-[#0a091b] z-0">
      <div
        className="
          absolute
          left-0 bottom-10
          w-[10%] h-72
          bg-[radial-gradient(ellipse_at_center,_rgba(92,54,103,0.5),_transparent_70%)]
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
          bg-[radial-gradient(ellipse_at_center,_rgba(92,54,103,0.5),_transparent_70%)]
          filter blur-2xl
          pointer-events-none
          -z-30 
        "
      ></div>
      <MainScreen title="Login" />
      <Container className="loginContainer z-10">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}
        
        <Form className="flex flex-col gap-5" onSubmit={submitHandler}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="relative">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type={showPassword ? "text" : "password"} // Toggle input type
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute bottom-[0%]  right-3 transform -translate-y-[50%] cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle visibility
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </Form.Group>

          <button
            
            type="submit"
            className="bg-accentHover text-white py-2 px-6 rounded-lg"
          >
            Submit
          </button>

          <p className="text-white">
            New Customer? <Link to="/register" className="text-[#9d82c9]">Register Here</Link>
          </p>
        </Form>
      </Container>
    </div>
  );
}

export default LoginPage;
