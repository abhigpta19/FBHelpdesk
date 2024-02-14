// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import '../css/AuthPage.css';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Replace with actual authentication logic
//     // Example: Check email and password against the backend, get JWT token

//     try {
//       // Simulating authentication
//       const response = await fetch('http://localhost:3001/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email,
//           password,
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('jwtToken', data.token);

//         // Redirect to a protected page after successful login
//         return <Navigate to="/dashboard" />;
//       } else {
//         const errorData = await response.json();
//         setLoginError(errorData.error || 'Login failed');
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setLoginError('Internal Server Error');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit} className="auth-form">
//           <label>
//             Email:
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           <label>
//             Password:
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           {loginError && <p className="error-message">{loginError}</p>}
//           <button type="submit" className="auth-button">
//             Login
//           </button>
//         </form>
//         <p>
//           Don't have an account? <Link to="/register">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// Login.js

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/AuthPage.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setShowPopup(true);
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);

        // Redirect to a protected page after successful login
        return <Navigate to="/dashboard" />;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Authentication failed');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Internal Server Error');
      setShowPopup(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>{error}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
