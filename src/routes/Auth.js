import { authService } from 'fbase';
import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import AuthForm from 'components/AuthForm';
import styled from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new GithubAuthProvider();
    }
    const data = await signInWithPopup(authService, provider);
    console.log(data);
  };

  return (
    <Div>
      <ImgContainer>
        <img src={`${process.env.PUBLIC_URL}/full-logo.png`} alt="Kiwitter" />
      </ImgContainer>
      <AuthContainer>
        <Logo
          src={`${process.env.PUBLIC_URL}/logo.png`}
          alt=""
          size="3rem"
          marginBottom="1rem"
        />
        <Text fontSize="3rem" marginBottom="2.5rem">
          Happening now
        </Text>
        <Text fontSize="2rem" marginBottom="2rem">
          Join Kiwitter today.
        </Text>
        <SignUpButton onClick={onSocialClick} name="google">
          <FcGoogle />
          Sign up with Google
        </SignUpButton>
        <SignUpButton onClick={onSocialClick} name="github">
          <FaGithub />
          Sign up with GitHub
        </SignUpButton>
        <SignUpWithEmailBtn>Sign up with email</SignUpWithEmailBtn>
        <Text marginTop="2rem">Already have an account?</Text>
        <SignInButton>Sign in</SignInButton>
      </AuthContainer>
    </Div>
  );
};

export default Auth;

const Div = styled.div`
  display: grid;
  grid-template-columns: 3fr minmax(max-content, 2fr);
  height: 100vh;
`;

const ImgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  grid-column: 1/2;
  height: inherit;
  img {
    max-width: 20vw;
    min-width: 20rem;
    margin: 3rem;
  }
  @media screen and (max-width: 500px) {
    grid-row: 2/3;
  }
  background: #d6eaed url('https://wallpaperaccess.com/full/1994929.jpg') repeat
    0 0;
  -webkit-animation: 30s linear 0s normal none infinite animate;
  -moz-animation: 30s linear 0s normal none infinite animate;
  -ms-animation: 30s linear 0s normal none infinite animate;
  -o-animation: 30s linear 0s normal none infinite animate;
  animation: 30s linear 0s normal none infinite animate;

  @-webkit-keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000px 0;
    }
  }

  @-moz-keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000px 0;
    }
  }

  @-ms-keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000px 0;
    }
  }

  @-o-keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000px 0;
    }
  }

  @keyframes animate {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 1000px 0;
    }
  }
`;

const AuthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  grid-column: 2/3;
  padding: 4rem;
  box-sizing: border-box;
  p {
    font-family: 'Kanit', sans-serif;
  }

  @media screen and (max-width: 500px) {
    grid-column: 1/2;
    grid-row: 1/2;
    height: inherit;
    align-items: center;
    min-width: max-content;
  }
`;

export const Logo = styled.img`
  width: ${(props) => props.size};
  margin-bottom: ${(props) => props.marginBottom};
`;

export const Text = styled.p`
  font-size: ${(props) => props.fontSize};
  margin-bottom: ${(props) => props.marginBottom};
  margin-top: ${(props) => props.marginTop};
`;

const SignUpButton = styled.button`
  border: solid 1px #eee;
  background-color: transparent;
  padding: 0.5rem 0;
  width: 300px;
  border-radius: 1.5rem;
  font-size: 1rem;
  &:hover {
    cursor: pointer;
    background-color: rgba(224, 224, 224, 0.5);
    border: solid 1px transparent;
    transition: 0.1s;
  }
  & + button {
    margin-top: 1rem;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 0.5rem;
  }
`;

const SignUpWithEmailBtn = styled(SignUpButton)`
  border: solid 1px #d6eaed;
  background-color: #d6eaed;
  color: #128b72;
  font-weight: 700;
  &:hover {
    background-color: rgba(222, 238, 241, 0.8);
  }
`;

const SignInButton = styled(SignUpButton)`
  color: #128b72;
  font-weight: 700;
  margin-top: 1rem;
  &:hover {
    background-color: rgba(222, 238, 241, 0.8);
  }
`;

Text.propTypes = {
  fontSize: PropTypes.string,
  marginBottom: PropTypes.string,
  marginTop: PropTypes.string,
};
