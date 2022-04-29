import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    navigate('/');
  };

  const getMyKiweets = async () => {
    const q = query(
      collection(dbService, 'kiweets'),
      where('creatorId', '==', userObj.uid),
      orderBy('createdAt', 'desc'),
    );
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => console.log(doc.id, '=>', doc.data()));
  };

  useEffect(() => {
    getMyKiweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setnewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      {}
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
