import { dbService, storageService } from 'fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';

const KiweetGenerator = ({ userObj }) => {
  const [kiweet, setKiweet] = useState('');
  const [attachment, setAttachment] = useState('');

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
  );
};

export default KiweetGenerator;
