import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./LandingPage.css";

function LandingPage({ history }) {


  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">

              <Link to="/login">
                <Button size="lg" className="landingbutton">
                  Login

                </Button>
              </Link>

              <Link to="/register">
              <Button
                variant="outline-primary"
                size="lg"
                className="landingbutton"
              >
                Signup
              </Button>
              </Link>

            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage;