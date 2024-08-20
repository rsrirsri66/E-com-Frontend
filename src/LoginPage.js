import React, { useState } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import "./login.scss"
function App() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // For sign-up
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        navigate(data.role === 'admin' ? '/products' : '/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password, email }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/');
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <MDBContainer fluid className="p-3 my-5 h-custom">
      <MDBRow>
        <MDBCol col='10' md='6'>
          <img src="https://media.licdn.com/dms/image/D4D12AQGAGO7-4DcQ7g/article-cover_image-shrink_720_1280/0/1674124614769?e=2147483647&v=beta&t=dNGYC2zR1oPypk4WKNdyblO-XZz61KXfQZnuDEF9jZQ" className="img-fluid move-down-transform" alt="Sample" />
        </MDBCol>
        <MDBCol col='4' md='6'>
          <div className={`cont ${isSignUp ? 's--signup' : ''}`}>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
            </div>
            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            {!isSignUp ? (
              <div className="form sign-in">
                <h2>Welcome</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleLogin}>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <div className="d-flex justify-content-between mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="#!">Forgot password?</a>
                  </div>
                  <MDBBtn type="submit" disabled={loading} className="mb-0 px-5" size='lg'>
                    {loading ? 'Loading...' : 'Sign In'}
                  </MDBBtn>
                  <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <span className="link" style={{color:"red"}} onClick={() => setIsSignUp(true)}>Register</span></p>
                </form>
              </div>
            ) : (
              <div className="form sign-up">
                <h2>Create your Account</h2>
                {error && <div className="error">{error}</div>}
                <form onSubmit={handleSignup}>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='email' type='email' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <MDBInput wrapperClass='mb-4' label='Password' id='password' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <MDBInput wrapperClass='mb-4' label='Confirm Password' id='confirmPassword' type='password' size="lg" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  <MDBBtn type="submit" disabled={loading} className="mb-0 px-5" size='lg'>
                    {loading ? 'Loading...' : 'Sign Up'}
                  </MDBBtn>
                  <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <span className="link" onClick={() => setIsSignUp(false)}>Login</span></p>
                </form>
              </div>
            )}
          </div>
        </MDBCol>
      </MDBRow>
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
        <div>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="md" />
          </MDBBtn>
          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='linkedin-in' size="md" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default App;
