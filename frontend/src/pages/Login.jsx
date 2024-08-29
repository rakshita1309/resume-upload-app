import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils';


export default function Login() {

  const [loginData, setSignupData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();


  const handleLoginData = (e) => {
    const { name, value} = e.target;
    setSignupData((loginData) => {
      return {
        ...loginData,
        [name]: value
      }
    })
  }
  console.log(' login data', loginData);


  const handleSignupSubmit = async () => {
    // validation
    const {  email, password } = loginData;
    if ( !email || !password){
      handleError('Please enter all the fields');
    } 
    //api call
    try {
      const url = 'http://localhost:8000/api/login';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      const result = await response.json();
      console.log(result);
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      }
    } catch (err) {
      handleError(err);
    }
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100vh',
      backgroundColor: '#f4edf5'

    }}>
     <div style={{
      border: '1px solid grey',
      padding: '36px',
      display: 'flex',
      flexDirection: 'column',
      gap: '36px',
        backgroundColor: 'white',
      borderRadius: '8px'
     }}>
    <div>
      <div style={{
        fontSize: '32px', 
        fontWeight: 'bold',
        color:'#760485'
        }}
      >
        Login
      </div>
      <div>
        Please fill the infomation to login
      </div>
    </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{
          display: 'flex',
          gap: '8px'
        }}>
        
        </div>
        <div>
          <input 
          style={{
            padding: '8px',
            borderRadius: '8px', 
            border: '1px solid grey'
          }}
          type='email' 
          placeholder='Email Address'
          name='email'
          value={loginData.email}
          onChange={handleLoginData}
          />
        </div>
        <div>
          <input 
          style={{
            padding: '8px',
            borderRadius: '8px', 
            border: '1px solid grey'
          }}
          type='password' 
          placeholder='Pasword'
          name= 'password'
          value={loginData.password}
          onChange={handleLoginData}
          />
        </div>
      </div>
       <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
       }}>
       <button
         style={{
          width: '40%', 
          padding: '8px', 
          backgroundColor: '#760485', 
          border: "none", 
          color: 'white',
          borderRadius: '8px'
        }}
       onClick={handleSignupSubmit} 
       >
          Submit
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'center'
        }}>
          <div style={{color:'grey'}}>
          Don't have an account? 
          </div>
          <div>
          <Link to={'/signup'}>Sign up</Link>
          </div>
        </div>
       </div>
     </div>
     <ToastContainer/>
    </div>
  )
}

