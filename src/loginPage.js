import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/auth';

function LoginPage() {
  const [userName, setUserName] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  const [secondErrorMessage, setSecondErrorMessage] = useState('');
  const [thirdErrorMessage, setThirdErrorMessage] = useState('');
// this for the redirecting to the To do list if logged in otherwise to the home page
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const redirectPath = location.state?.path || '/';

  async function handleSubmit(event) {
    event.preventDefault();

    const credentials = {
      firstName: userName,
      email: Email,
      password: Password,
    };
// this fuction waits intil all credetials that have been store are compared to user to see if they are present
    const loginUser = async (credentials) => {
      try {
        const response = await fetch('http://localhost:7000/profile', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const profile = await response.json();
        const user = profile.find(
          (user) =>
            user.firstName === credentials.firstName &&
            user.email === credentials.email &&
            user.password === credentials.password
        );
        return user;
      } catch (error) {
        console.error('Error logging in user:', error);
      }
    };

    const user = await loginUser(credentials);
// these are the conditions that should be fulfilled and the errors that otherwise appear 
    if (userName.length === 0) {
      setFirstErrorMessage('Required');
      setUserName('');
    } else if (userName.length < 5) {
      setFirstErrorMessage('Username should have more than 5 characters');
      setUserName('');
    } else if (userName !== credentials.firstName) {
      setFirstErrorMessage('Invalid username');
      setUserName('');
    } else if (userName === credentials.firstName) {
      setFirstErrorMessage('');
    }

    if (Email.length === 0) {
      setSecondErrorMessage('Required');
      setEmail('');
    } else if (Email !== credentials.email) {
      setSecondErrorMessage('Invalid email');
      setEmail('');
    } else if (Email === credentials.email) {
      setSecondErrorMessage('');
    }

    if (Password.length === 0) {
      setThirdErrorMessage('Required');
      setPassword('');
    } else if (Password.length < 8) {
      setThirdErrorMessage('Password should have more than 8 characters');
      setPassword('');
    } else if (Password !== credentials.password) {
      setThirdErrorMessage('Invalid password');
      setPassword('');
    } else if (Password === credentials.password) {
      setThirdErrorMessage('');
    }
    // this it for login in if the users credentials are present in the json server
    if (user) {
      auth.login(userName);
      navigate(redirectPath, { replace: true });
    }
  }

  return (
    <div className="Login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <p>{firstErrorMessage}</p>
        <br />

        <input
          type="text"
          placeholder="email"
          required
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>{secondErrorMessage}</p>
        <br />

        <input
          type="password"
          placeholder="Password"
          required
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p>{thirdErrorMessage}</p>
        <br />

        <button type="submit">Log in</button>
      </form>
    </div>
  );
}

export default LoginPage;
