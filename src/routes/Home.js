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
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [kiweet, setKiweet] = useState('');
  const [kiweets, setKiweets] = useState([]);
  const [attachment, setAttachment] = useState('');

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

  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = '';
    if (attachment !== '') {
      const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
      await uploadString(attachmentRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(attachmentRef);
    }
    await addDoc(collection(dbService, 'kiweets'), {
      text: kiweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setKiweet('');
    setAttachment('');
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setKiweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          onChange={onChange}
          value={kiweet}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Kiweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" alt="" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
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
