import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup.jsx';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings'
import ForgotPass from './Components/ForgotPass/ForgotPassword.jsx';
import OTPPage from './Components/OTPPage/OTPPage.jsx';
import InputNewPassword from './Components/InputNewPassword.jsx/InputNewPassword.jsx';
import TambahKolam from './Components/TambahKolam/TambahKolam.jsx';
import KolamIkan from './Components/KolamIkan/KolamIkan.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/otp" element={<OTPPage />} />
        <Route path="/inputnewpassword/:userId" element={<InputNewPassword />} />
        <Route path="/tambahkolam" element={<TambahKolam />} />
        <Route path="/kolamikan" element={<KolamIkan/>} />
      </Routes>
    </Router>
  );
}

export default App;
