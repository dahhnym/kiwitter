import { storageService } from 'fbase';
import { ref } from 'firebase/storage';
import { deleteDoc } from 'firebase/firestore';
import { deleteObject } from 'firebase/storage';
import styled from 'styled-components';
import { IoMdClose } from 'react-icons/io';

const KiweetMenu = ({
  toggleEditing,
  kiweetObj,
  KiwitTextRef,
  isOpen,
  toggleOpen,
}) => {
  const attachmentUrlRef = ref(storageService, kiweetObj.attachmentUrl);

  const onDeleteClick = async () => {
    const ok = window.confirm('Are you sure you want to delete this kiwit?');
    if (ok) {
      await deleteDoc(KiwitTextRef);
      await deleteObject(attachmentUrlRef);
    }
  };

  return (
    <Popup display={isOpen ? 'flex' : 'none'}>
      <CloseButton onClick={toggleOpen}>
        <IoMdClose />
      </CloseButton>
      <EditButton onClick={toggleEditing}>Edit Kiweet</EditButton>
      <DeleteButton onClick={onDeleteClick}>Delete Kiweet</DeleteButton>
    </Popup>
  );
};

export default KiweetMenu;

const Popup = styled.div`
  display: ${(props) => props.display};
  flex-direction: column;
  border: solid 1px #eee;
  background-color: #fff;
  position: relative;
  width: 10rem;
  border-radius: 0.3rem;
  box-shadow: 0px 0px 7px 2px #eee;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 100;
`;

const EditButton = styled.button`
  padding: 1rem;
  &:hover {
    cursor: pointer;
    background-color: #f7f7f7;
    transition: 0.2s;
  }
`;

const DeleteButton = styled(EditButton)``;

const CloseButton = styled.button`
  align-self: flex-end;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  &:hover {
    cursor: pointer;
  }
`;
