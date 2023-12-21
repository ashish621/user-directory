// Example Route Setup in App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './userList';
import UserProfile from './userProfile';
import './App.css'
function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
