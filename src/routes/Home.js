import { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import {
  addDoc,
  collection,
  query,
  onSnapshot,
  orderBy,
} from 'firebase/firestore';
import Kiwit from 'components/Kiwit';

const Home = ({ userObj }) => {
  const [kiwit, setKiwit] = useState('');
  const [kiwits, setKiwits] = useState([]);

  const getKiwits = async () => {
    const q = query(
      collection(dbService, 'kiwits'),
      orderBy('createdAt', 'desc'),
    );
    onSnapshot(q, (snapshot) => {
      const kiwitArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setKiwits(kiwitArr);
    });
  };

  useEffect(() => {
    getKiwits();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, 'kiwits'), {
      text: kiwit,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setKiwit('');
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKiwit(value);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={kiwit}
        />
        <input type="submit" value="Kiwit" />
      </form>
      <div>
        {kiwits.map((kiwit) => {
          return (
            <Kiwit
              key={kiwit.id}
              kiwitObj={kiwit}
              isOwner={kiwit.creatorId === userObj.uid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
