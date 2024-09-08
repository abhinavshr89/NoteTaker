import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
const Header = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const userLogin = useSelector(state =>state.userLogin);

  const {userInfo} = userLogin;

  const logoutHandler = () => {
    dispatch({type: 'USER_LOGOUT'});
    navigate('/');
  }


  return (
    <div>

      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>

          <Navbar.Brand href="#">
            <Link to="/" className='hover:no-underline'>Note Zipper</Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll d-flex">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >

 
              <Nav.Link href="#action2">
                <Link to="/mynotes" className='nounderline'>My Notes</Link>
              </Nav.Link>

              <NavDropdown title="user" id="navbarScrollingDropdown">
                <NavDropdown.Item href="/profile">My Profile</NavDropdown.Item>
                <NavDropdown.Item href="#action4"
                onClick={logoutHandler}
                >
                  Log Out
                </NavDropdown.Item>

              </NavDropdown>

            </Nav>
            <Form className="d-flex ml-auto">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </div>
  )
}

export default Header