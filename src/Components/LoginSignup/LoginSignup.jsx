import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginSignup.css';
import user_icon from '../Assets/person.png';
import password from '../Assets/password.png';
import email from '../Assets/email.png';
import { users } from '../dummydata'; // Import data dummy

export const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [clickCount, setClickCount] = useState(0);
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: ''
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

  const handleButtonClick = (newAction) => {
    const { name, email, password } = inputs;

    if (action === newAction) {
      if (newAction === "Login") {
        // Handle login logic
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
          setClickCount(clickCount + 1);
          if (clickCount + 1 >= 2) {
            navigate('/home');
          }
        } else {
          setError('Email or password is incorrect');
        }
      } else if (newAction === "Sign Up") {
        // Handle sign-up logic
        const newUser = {
          id: users.length + 1,
          name,
          email,
          password
        };
        // Simulate adding new user to the data
        users.push(newUser);
        navigate('/home');
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
        {action === "Login" ? null : (
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
        )}
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
      </div>
      <div className='forgot-password'>Lupa Password? <span>Klik Di sini</span></div>
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
