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

const Home = ({ userObj }) => {
  const [kiweets, setKiweets] = useState([]);

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
    <Container>
      {Boolean(userObj) && <Navigation userObj={userObj} />}
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
    </Container>
  );
};

export default Home;

const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  background-color: #fff;
`;

const HomeFeedContainer = styled.div`
  border-left: solid 1px #eee;
  border-right: solid 1px #eee;
`;

const KiweetsContainer = styled.div`
  /* border-bottom: solid 1px #eee; */
`;
