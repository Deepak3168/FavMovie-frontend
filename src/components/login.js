import React from 'react';
import  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
}
from 'mdb-react-ui-kit';



function LoginForm({ login, message }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const onChangeEmail = e => {
  const email = e.target.value;
    setEmail(email);
    }
  const onChangePassword = e => {
    const password = e.target.value;
    setPassword(password);
    }
  const handleLogin = async (event) => {
      event.preventDefault();
      const success = await login({ email, password });
      if (success) {
          navigate("/");
      }
  };
  return (
    <MDBContainer className='my-5'>
      <MDBCard>

        <MDBRow className='g-0 d-flex align-items-center'>

          <MDBCol md='4'>
            <MDBCardImage src='https://5.imimg.com/data5/FD/JO/MY-47302125/pop-corn-box.jpg' alt='phone' className='rounded-t-5 rounded-tr-lg-0' fluid />
          </MDBCol>

          <MDBCol md='8'>

            <MDBCardBody>

              <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={onChangeEmail}/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={onChangePassword}/>
              <p className='ms-5'>Don't have an account? <Link to="/signup" className="link-info">Register here</Link></p>

              <button type="button" className="btn btn-primary btn-lg" onClick={handleLogin}>
                          Sign In
                        </button>
              {message && <p style={{ color: 'red' }}>{message}</p>}

            </MDBCardBody>

          </MDBCol>

        </MDBRow>

      </MDBCard>
    </MDBContainer>
  );
}

export default LoginForm;

