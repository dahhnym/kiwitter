import { useState } from 'react';
import { authService } from 'fbase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import styled from 'styled-components';
import { SubmitButton } from './KiweetGenerator';

const AuthForm = ({ newAccount, setNewAccount }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password,
        );
      } else {
        data = await signInWithEmailAndPassword(authService, email, password);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <Form onSubmit={onSubmit}>
        <TextInput
          name="email"
          type="text"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <TextInput
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <Error>{error}</Error>
        <SubmitButton
          marginTop="1rem"
          type="submit"
          value={newAccount ? 'Create Account' : 'Sign In'}
        />
      </Form>
      <SwitchButton onClick={toggleAccount}>
        {newAccount ? 'Sign in' : 'Create Account'}
      </SwitchButton>
    </>
  );
};

export default AuthForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.input`
  border: solid 1px #eee;
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
`;

const Error = styled.p`
  font-size: 0.8rem;
  color: #d60000;
`;

const SwitchButton = styled.p`
  text-align: center;
  margin-top: 1rem;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;
