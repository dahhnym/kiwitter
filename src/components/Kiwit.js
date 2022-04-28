import { dbService } from 'fbase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';

const Kiwit = ({ kiwitObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKiwit, setNewKiwit] = useState(kiwitObj.text);
  const KiwitTextRef = doc(dbService, 'kiwits', `${kiwitObj.id}`);
  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this kiwit?');
    if (ok) {
      await deleteDoc(KiwitTextRef);
    }
  };
  const toggleEditing = () => setEditing((prev) => !prev);
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(kiwitObj, newKiwit);
    await updateDoc(KiwitTextRef, { text: newKiwit });
    setEditing(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewKiwit(value);
  };
  return (
    <div>
      {editing ? (
        <>
          {isOwner && (
            <>
              <form onSubmit={onSubmit}>
                <input
                  value={newKiwit}
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
          <p>{kiwitObj.text}</p>
          <img src={kiwitObj.attachmentUrl} width="100px" alt="" />
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Kiwit</button>
              <button onClick={toggleEditing}>Edit Kiwit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Kiwit;
