import { authService, dbService } from 'fbase';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { deleteUser, updateProfile } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Main } from './Home';
import { SubmitButton } from 'components/KiweetGenerator';
import { Error } from 'components/AuthForm';

const Profile = ({ userObj, refreshUser }) => {
  const navigate = useNavigate();
  const [newDisplayName, setnewDisplayName] = useState(userObj.displayName);
  const [display, setDisplay] = useState(false);
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
    if (newDisplayName === null) {
      setDisplay(true);
      return;
    } else {
      setDisplay(false);
    }
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(authService.currentUser, {
        displayName: newDisplayName,
      });
    }
    refreshUser();
    alert('Your profile is updated!');
  };

  const onDeactivateClick = async () => {
    const confirm = window.confirm(
      `Once you proceed this action, it cannot be undone. All of your data will be deleted and your account will be permanently closed .\nDo you wish to deactivate your account?`,
    );
    if (confirm) {
      try {
        const result = await deleteUser(authService.currentUser);
        console.log(result);
        alert(`Your account is successfully deactivated. `);
        navigate('/');
      } catch (error) {
        console.log(error);
      }
    } else {
      return;
    }
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
          {display && (
            <ErrorMsg>Username should be longer than 3 letters.</ErrorMsg>
          )}
          <UpdateButton
            type="submit"
            value="Update Profile"
            marginTop={'1rem'}
          />
        </Form>
        <LogoutButton as="button" onClick={onLogOutClick}>
          Log out
        </LogoutButton>
        <DeactivateButton as="button" onClick={onDeactivateClick}>
          Deactivate
        </DeactivateButton>
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
`;

const UpdateButton = styled(SubmitButton)`
  width: 10rem;
`;

const LogoutButton = styled(SubmitButton)`
  background-color: #eee;
  color: #aaa;
  width: 10rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const ErrorMsg = styled(Error)`
  margin-top: 0.5rem;
`;

const DeactivateButton = styled(SubmitButton)`
  width: 10rem;
  background-color: #eee;
  color: #d60000;
  margin-top: 0.5rem;
  &:hover {
    background-color: rgba(165, 4, 4, 0.7);
    color: #fff;
  }
`;
