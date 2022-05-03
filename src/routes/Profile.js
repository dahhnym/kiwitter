import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from './Home';
import { SubmitButton } from 'components/KiweetGenerator';

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);
  const [myKiweets, setMyKiweets] = useState([]);

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
    let querySnapshot = await getDocs(q);
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
    alert('Your profile is updated!');
  };

  return (
    <Main>
      <Container>
        <Form onSubmit={onSubmit}>
          <EditNameInput
            type="text"
            placeholder="Edit name"
            value={newDisplayName}
            onChange={onChange}
            maxLength="50"
          />
          <UpdateButton width="10rem" type="submit" value="Update Profile" />
        </Form>
        <LogoutButton as="button" onClick={onLogOutClick}>
          Log out
        </LogoutButton>
      </Container>
    </Main>
  );
};

export default Profile;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
  height: 100vh;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EditNameInput = styled.input`
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 0;
  border-bottom: solid 1px #eee;
  margin-bottom: 1rem;
`;

const UpdateButton = styled(SubmitButton)`
  width: 10rem;
`;

const LogoutButton = styled(SubmitButton)`
  background-color: #eee;
  color: #aaa;
  width: 10rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;
