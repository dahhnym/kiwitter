import AppRouter from './Router';
import { useEffect, useState } from 'react';
import { authService } from 'fbase';
import Navigation from './Navigation';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  }, []);

  return (
    <>
      {Boolean(userObj) && <Navigation />}
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        'Initializing...'
      )}
    </>
  );
}

export default App;
