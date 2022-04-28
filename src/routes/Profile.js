import { authService } from 'fbase';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };
  const navigate = useNavigate();

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
