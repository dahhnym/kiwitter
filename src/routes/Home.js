import { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import Kiwit from 'components/Kiweet';
import KiweetGenerator from 'components/KiweetGenerator';

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
    <div>
      <KiweetGenerator userObj={userObj} />
      <div>
        {kiweets.map((kiweet) => {
          return (
            <Kiwit
              key={kiweet.id}
              kiweetObj={kiweet}
              isOwner={kiweet.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
