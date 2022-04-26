import { Routes, Route } from 'react-router-dom';
import Auth from './routes/Auth';
import Home from './routes/Home';
import Profile from './routes/Profile';

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path={'/'} element={<Home />} exact={true} />
      ) : (
        <Route path={'/'} element={<Auth />} exact={true} />
      )}
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default AppRouter;
