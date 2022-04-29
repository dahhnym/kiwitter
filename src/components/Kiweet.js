import { dbService, storageService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { useState } from 'react';

const Kiwit = ({ kiweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKiweet, setNewKiweet] = useState(kiweetObj.text);
  const KiwitTextRef = doc(dbService, 'kiwits', `${kiweetObj.id}`);
  const attachmentUrlRef = ref(storageService, kiweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this kiwit?');
    if (ok) {
      await deleteDoc(KiwitTextRef);
      await deleteObject(attachmentUrlRef);
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDoc(KiwitTextRef, { text: newKiweet });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKiweet(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  value={newKiweet}
                  required
                  placeholder="Edit your kiwit"
                  onChange={onChange}
                />
                <input type="submit" value="Update Kiwit" />
              </form>
              <button onClick={toggleEditing}>Cancel</button>
            </>
          )}
        </>
      ) : (
        <>
          <p>{kiweetObj.text}</p>
          <img src={kiweetObj.attachmentUrl} width="100px" alt="" />
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Kiweet</button>
              <button onClick={toggleEditing}>Edit Kiweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Kiwit;
