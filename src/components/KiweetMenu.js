import { storageService } from 'fbase';
import { ref } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';

const KiweetMenu = ({ toggleEditing, kiweetObj, KiwitTextRef }) => {
  const attachmentUrlRef = ref(storageService, kiweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this kiwit?');
    if (ok) {
      await deleteDoc(KiwitTextRef);
      await deleteObject(attachmentUrlRef);
    }
  };

  return (
    <div>
      <button onClick={onDeleteClick}>Delete Kiweet</button>
      <button onClick={toggleEditing}>Edit Kiweet</button>
    </div>
  );
};

export default KiweetMenu;
