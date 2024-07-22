import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import password from '../Assets/password.png';
import email from '../Assets/email.png';
import phone_icon from '../Assets/phone.png';
import address_icon from '../Assets/address.png';
import city_icon from '../Assets/city.png';
import province_icon from '../Assets/province.png';
import business_name_icon from '../Assets/business_name.png';
import business_desc_icon from '../Assets/business_desc.png';
import dob_icon from '../Assets/dob.png';
import Gender from '../Gender/Gender';

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [clickCount, setClickCount] = useState(0);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    gender: '',
    dob: '',
    password: '',
    confirm_password: '',
    phone: '',
    address: '',
    city: '',
    province: '',
    business_name: '',
    business_desc: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleButtonClick = async (newAction) => {
    const { name, email, gender, dob, password, confirm_password, phone, address, city, province, business_name, business_desc } = inputs;

    if (action === newAction) {
      if (newAction === "Login") {
        try {
          const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
          });

          const data = await response.json();

          if (response.ok) {
            Cookies.set('Authorization', data.Cookies);
            navigate('/home');
          } else {
            setError(data.message || 'Email or password is incorrect');
          }
        } catch (error) {
          setError('An error occurred. Please try again later.');
        }
      } else if (newAction === "Sign Up") {
        try {
          const response = await fetch('http://localhost:3001/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, gender, dob, password, confirm_password, phone, address, city, province, business_name, business_desc }),
          });

          const data = await response.json();

          if (response.ok) {
            navigate('/home');
          } else {
            setError(data.message || 'Failed to sign up. Please try again.');
          }
        } catch (error) {
          setError('An error occurred. Please try again later.');
        }
      }
    } else {
      setAction(newAction);
      setClickCount(1);
      setError('');
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === "Login" ? (
          <>
            <div className='input'>
              <img src={email} alt='' />
              <input
                type='email'
                placeholder='Email Id'
                name='email'
                value={inputs.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={password} alt='' />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className='input'>
              <img src={user_icon} alt='' />
              <input
                type='text'
                placeholder='Name'
                name='name'
                value={inputs.name}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={email} alt='' />
              <input
                type='email'
                placeholder='Email Id'
                name='email'
                value={inputs.email}
                onChange={handleInputChange}
              />
            </div>
            <div className='dropdown'>
              <Gender
                value={inputs.gender}
                onChange={(event) => handleInputChange({ 
                  target: { name: 'gender', value: event.target.value } })}
              />
            </div>
            <div className='input'>
              <img src={dob_icon} alt='' />
              <input
                type='date'
                placeholder='Date of Birth'
                name='dob'
                value={inputs.dob}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={phone_icon} alt='' />
              <input
                type='text'
                placeholder='Phone Number'
                name='phone'
                value={inputs.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={address_icon} alt='' />
              <input
                type='text'
                placeholder='Address'
                name='address'
                value={inputs.address}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={city_icon} alt='' />
              <input
                type='text'
                placeholder='City'
                name='city'
                value={inputs.city}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={province_icon} alt='' />
              <input
                type='text'
                placeholder='Province'
                name='province'
                value={inputs.province}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={business_name_icon} alt='' />
              <input
                type='text'
                placeholder='Business Name'
                name='business_name'
                value={inputs.business_name}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={business_desc_icon} alt='' />
              <input
                type='text'
                placeholder='Business Description'
                name='business_desc'
                value={inputs.business_desc}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={password} alt='' />
              <input
                type='password'
                placeholder='Password'
                name='password'
                value={inputs.password}
                onChange={handleInputChange}
              />
            </div>
            <div className='input'>
              <img src={password} alt='' />
              <input
                type='password'
                placeholder='Confirm Password'
                name='confirm_password'
                value={inputs.confirm_password}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}
      </div>
      <div className='forgot-password'>
        Lupa Password? <Link to="/forgotpassword">Klik Di sini</Link>
      </div>
      <div className='submit-container'>
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => handleButtonClick("Sign Up")}
        >
          SignUp
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => handleButtonClick("Login")}
        >
          Login
        </div>
      </div>
      {error && <div className='error-message'>{error}</div>}
    </div>
  );
};

export default LoginSignup;
