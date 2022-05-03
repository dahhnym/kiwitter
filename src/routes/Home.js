import { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import Kiweet from 'components/Kiweet';
import KiweetGenerator from 'components/KiweetGenerator';
import styled from 'styled-components';
import Navigation from 'components/Navigation';
import { useLocation } from 'react-router-dom';
import Profile from './Profile';

const Home = ({ userObj }) => {
  const [kiweets, setKiweets] = useState([]);
  const location = useLocation();

  const getKiweets = async () => {
    const q = query(
      collection(dbService, 'kiweets'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(q, (snapshot) => {
      const kiweetArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setKiweets(kiweetArr);
    });
  };

  useEffect(() => {
    getKiweets();
  }, []);

  return (
    <Main>
      <HomeFeedContainer>
        <KiweetGenerator userObj={userObj} />
        {kiweets.length !== 0 ? (
          <>
            <KiweetsContainer>
              {kiweets.map((kiweet) => {
                return (
                  <Kiweet
                    key={kiweet.id}
                    kiweetObj={kiweet}
                    isOwner={kiweet.creatorId === userObj.uid}
                  />
                );
              })}
            </KiweetsContainer>
          </>
        ) : (
          <p>No Kiweets here. Please write your first Kiweet.</p>
        )}
      </HomeFeedContainer>
      ){location.pathname === '/profile' && <Profile />}
    </Main>
  );
};

export default Home;

export const Main = styled.main`
  max-width: 1024px;
  @media screen and (max-width: 500px) {
    min-width: 100%;
  }
`;

export const HomeFeedContainer = styled.div`
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
`;

const KiweetsContainer = styled.div`
  /* border-bottom: solid 1px #eee; */
`;
