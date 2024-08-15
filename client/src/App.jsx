import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNotes from './pages/MyNotes/MyNotes';
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
