
import { useState } from "react";
import { BrowserRouter, Router, Routes, Route } from "react-router-dom";
import Auth from "./routes/Auth";
import Home from "./routes/Home"

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <BrowserRouter>
      <Router>
        <Routes>
          {isLoggedIn ? (
            <>
          <Route path={"/"} element={<Home />} />
          </>
              ): (
              <>
          <Route path={"/"} element={<Auth />} />
            </>
        )}
        </Routes>
      </Router>
    </BrowserRouter>
    
  )
}

export default AppRouter;