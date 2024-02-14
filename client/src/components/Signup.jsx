// import React, { useState } from 'react';
// import { Link, Navigate } from 'react-router-dom';
// import '../css/AuthPage.css';

// const SignUpPage = () => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [signupError, setSignupError] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Replace with actual registration logic
//     // Example: Save user details to the backend, get JWT token

//     try {
//       // Simulating registration
//       const response = await fetch('http://localhost:3001/api/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           fullName,
//           email,
//           password,
//           role: 'user', // Assume a default role for simplicity
//         }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem('jwtToken', data.token);

//         // Redirect to a protected page after successful registration
//         return <Navigate to="/dashboard" />;
//       } else {
//         const errorData = await response.json();
//         setSignupError(errorData.error || 'Registration failed');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setSignupError('Internal Server Error');
//     }
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit} className="auth-form">
//           <label>
//             Full Name:
//             <input
//               type="text"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           </label>
//           <br />
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
//           <label>
//             Confirm Password:
//             <input
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </label>
//           <br />
//           {signupError && <p className="error-message">{signupError}</p>}
//           <button type="submit" className="auth-button">
//             Sign Up
//           </button>
//         </form>
//         <p>
//           Already have an account? <Link to="/login">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

// SignUp.js

import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../css/AuthPage.css';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      setShowPopup(true);
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          role: 'user',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwtToken', data.token);

        // Redirect to a protected page after successful registration
        return <Navigate to="/dashboard" />;
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Registration failed');
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Internal Server Error');
      setShowPopup(true);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp} className="auth-form">
          <label>
            Full Name:
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>
          <br />
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
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
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

export default SignUp;
