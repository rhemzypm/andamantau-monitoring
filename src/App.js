import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup.jsx';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
