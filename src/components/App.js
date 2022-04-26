import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService } from "fbase";
import Navigation from "./Navigation";

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])
  // setInterval(() => {
  //   console.log(authService.currentUser)
  // }, 2000);
  return (
    <>
      {isLoggedIn && <Navigation />}
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "Initializing..."}
      <footer>&copy;Kiwitter {new Date().getFullYear() }</footer>
    </>
  );
}

export default App;
