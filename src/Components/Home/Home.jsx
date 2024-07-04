import React, { useState,useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import Card from '../Carousel Card/Card';
import './Home.css';


// const Home = () => {
//  const [devices, setDevices] = useState([]); 

//   useEffect(() => {
//     fetch('https://example.com/api/devices')
//       .then(response => response.json())
//       .then(data => setDevices(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <div className="home-container">
//       <div className="home-header">
//         <div className="home-title">Device Saya</div>
//         <div className="home-underline"></div>
//       </div>
//       <div className="card-container">
//         {devices.map(device => (
//           <Card key={device.id} title={device.name} description={device.description} />
//         ))}
//       </div>
//       <Navbar />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-header">
        <div className="home-title">Device Saya</div>
        <div className="home-underline"></div>
      </div>
      <div className="card-container">
        <Card title="Device 1" description="Ini adalah isi dari device pertama." />
        <Card title="Device 2" description="Ini adalah isi dari device kedua." />
        <Card title="Device 3" description="Ini adalah isi dari device ketiga." />
      </div>
      <Navbar />
    </div>
  );
};

export default Home;