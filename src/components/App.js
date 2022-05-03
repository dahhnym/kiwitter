import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { authService } from 'fbase';
import Navigation from './Navigation';
import styled from 'styled-components';
import 'App.css';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  const refreshUser = () => {
    const user = authService.currentUser;

    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <Container
      display={Boolean(userObj) ? 'flex' : 'block'}
      justifyContent={Boolean(userObj) ? 'center' : ''}
    >
      {Boolean(userObj) && <Navigation userObj={userObj} />}
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
          refreshUser={refreshUser}
        />
      ) : (
        'Initializing...'
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  display: ${(props) => props.display};
  justify-content: ${(props) => props.justifyContent};
  @media screen and (max-width: 1000px) {
    position: relative;
    display: flex;
  }
`;

Container.defaultProps = {
  display: 'block',
  justifyContent: 'normal',
};
