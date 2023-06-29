import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstErrorMessage, setFirstErrorMessage] = useState('');
  const [secondErrorMessage, setSecondErrorMessage] = useState('');
  const [thirdErrorMessage, setThirdErrorMessage] = useState('');
  const [forthErrorMessage, setForthErrorMessage] = useState('');
  const [firthErrorMessage, setFirthErrorMessage] = useState('');
  const [isPending, setIsPending] = useState(false);

  const profile = {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsPending(true);
// these are the conditions that should be fulfilled and the errors that otherwise appear 
    if (firstName.length === 0) {
      setFirstErrorMessage('Required');
    } else if (firstName.length < 5) {
      setFirstErrorMessage('User first name should have more than 5 characters');
    } else {
      setFirstErrorMessage('');
    }

    if (lastName.length === 0) {
      setSecondErrorMessage('Required');
    } else if (lastName.length < 5) {
      setSecondErrorMessage('User last name should have more than 5 characters');
    } else {
      setSecondErrorMessage('');
    }

    if (email.length === 0) {
      setThirdErrorMessage('Required');
    } else {
      setThirdErrorMessage('');
    }

    if (password.length === 0) {
      setForthErrorMessage('Required');
    } else if (password.length < 8) {
      setForthErrorMessage('Password should have more than 8 characters');
    } else {
      setForthErrorMessage('');
    }

    if (confirmPassword.length === 0) {
      setFirthErrorMessage('Required');
    } else if (confirmPassword !== password) {
      setFirthErrorMessage('Wrong password, confirm again');
    } else {
      setFirthErrorMessage('');
    }

    if (
      firstName.length > 0 &&
      firstName.length >= 5 &&
      lastName.length > 0 &&
      lastName.length >= 5 &&
      email.length > 0 &&
      password.length > 0 &&
      password.length >= 8 &&
      confirmPassword.length > 0 &&
      confirmPassword === password
    )
    // posts the data that has been registered to the json server
    {
      fetch('http://localhost:7000/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
        .then(() => {
          setIsPending(false);
          navigate('/', { replace: true });
        })
        .catch((error) => {
          console.error('Error creating user:', error);
        });
    } else {
      setIsPending(false);
    }
  };

  return (
    <div className="Details">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />
        <p>{firstErrorMessage}</p>
        <br />
        <input
          type="text"
          placeholder="Last Name"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />
        <p>{secondErrorMessage}</p>
        <br />
        <input
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <p>{thirdErrorMessage}</p>
        <br />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <p>{forthErrorMessage}</p>
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <p>{firthErrorMessage}</p>
        <br />

        {!isPending && <button type="submit">Register</button>}
        {isPending && <button type="submit" disabled>Loading...</button>}
      </form>
    </div>
  );
}

export default RegistrationPage;
