import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import { handleSuccess, handleError } from '../utils';
import Resume from '../component/Resume';


export default function Signup() {

  const [signupData, setSignupData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    password: '',
    uploadfile: 'Choose file'
  });

  const navigate = useNavigate();


  const handleSignupData = (e) => {
    const { name, value} = e.target;
    setSignupData((signupData) => {
      return {
        ...signupData,
        [name]: value
      }
    })
  }
  console.log(' signup data', signupData);


  const handleSignupSubmit = async () => {
    // validation
    const { firstname, lastname, email, password, phonenumber } = signupData;
    if ( !firstname || !lastname || !email || !password){
      handleError('Please enter all the fields');
    } 
    //api call
    try {
      const url = 'http://localhost:8000/api/signup';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      const result = await response.json();
      console.log(result);
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else if (!success) {
        let detaails = result?.error?.details?.[0]?.message

        console.log(detaails);
        handleError(detaails);
      }
    } catch (err) {
      let message = err?.error?.details?.[0]?.message

      console.log(message);

      handleError(message ? {message } : err);
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
      padding: '42px',
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
        Sign up
      </div>
      <div>
        Please fill the infomation and upload your file.
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
          <input 
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid grey'
          }}
          type='text' 
          placeholder='First Name'
          name= 'firstname'
          value={signupData.firstname}
          onChange={handleSignupData}
          />
          <input 
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid grey'
          }}
          type='text' 
          placeholder='Last Name'
          name='lastname'
          value={signupData.lastname}
          onChange={handleSignupData}
          />
        </div>
        <div>
          <input
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid grey',
            width: '95%'
          }}
          type='email' 
          placeholder='Email Address'
          name='email'
          value={signupData.email}
          onChange={handleSignupData}
          />
        </div>
        <div>
          <input 
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid grey',
            width: '95%'
          }}
          type='text' 
          placeholder='Phone number'
          name= 'phonenumber'
          value={signupData.phonenumber}
          onChange={handleSignupData}
          />
        </div>
        <div>
          <input 
          style={{
            padding: '8px', 
            borderRadius: '8px', 
            border: '1px solid grey',
            width: '95%'
          }}
          type='password' 
          placeholder='Pasword'
          name= 'password'
          value={signupData.password}
          onChange={handleSignupData}
          />
        </div>
      </div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '8px',
        backgroundColor: 'white',
        borderRadius: '8px', 
        border: '1px solid grey'
      }}>
        <div>Upload Resume</div>
        <div style={{
          color: 'grey'
        }}>
          Please upload the file you want to share with us
          </div>
          <Resume />    
        </div>
        <div>
        <label htmlFor='checkbox'>
        <input type='checkbox' id='checkbox'/>
        <span> 
          I agree to the terms and conditions
        </span>
        </label>
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
          SIGN UP
        </button>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '8px',
          justifyContent: 'center',
        }}>
          <div style={{color:'grey'}}>
          Already have an account? 
          </div>
          <div>
          <Link to={'/login'}>Login</Link>
          </div>
        </div>
       </div>
     </div>
     <ToastContainer/>
    </div>
  )
}
