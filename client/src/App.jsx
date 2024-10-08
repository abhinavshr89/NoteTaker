import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import LandingPage from './pages/LandingPage/LandingPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MyNotes from './pages/MyNotes/MyNotes';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import CreateNotes from './pages/CreateNote/CreateNotes';
import SingleNote from './pages/CreateNote/SingleNote';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import { useState } from 'react';
const App = () => {
  const[search,setSearch] = useState("");
  

  return (
    <Router>
      <Header setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mynotes" element={<MyNotes  search={search}/>}  />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/createnote" element={<CreateNotes/>} />
        <Route path="/note/:id" element={<SingleNote/>} />
        <Route path="/profile" element ={<ProfilePage/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
