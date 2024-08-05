import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignup/LoginSignup.jsx';
import Home from './Components/Home/Home';
import Settings from './Components/Settings/Settings'
import ForgotPass from './Components/ForgotPass/ForgotPassword.jsx';
import InputNewPassword from './Components/InputNewPassword.jsx/InputNewPassword.jsx';
import TambahKolam from './Components/TambahKolam/TambahKolam.jsx';
import KolamIkan from './Components/KolamIkan/KolamIkan.jsx';
import AddDevice from './Components/AddDevice/AddDevice.jsx';
import SensorMonitoring from './Components/SensorMonitoring/SensorMonitoring.jsx';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginsignup" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/forgotpassword" element={<ForgotPass />} />
        <Route path="/inputnewpassword/:token" element={<InputNewPassword />} />
        <Route path="/tambahkolam" element={<TambahKolam />} />
        <Route path="/kolamikan/:ID" element={<KolamIkan/>} />
        <Route path="/adddevice/:group_name/:ID" element={<AddDevice />} />
        <Route path="/sensor-monitoring/:deviceId" element={<SensorMonitoring />} />
      </Routes>
    </Router>
  );
}

export default App;
