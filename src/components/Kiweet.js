import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'routes/Auth';
import { BsThreeDots } from 'react-icons/bs';
import KiweetMenu from './KiweetMenu';
import { timeStamp } from 'utils/timeStamp';
import { SubmitButton } from './KiweetGenerator';

const Kiweet = ({ kiweetObj, isOwner, displayName }) => {
  const [editing, setEditing] = useState(false);
  const [newKiweet, setNewKiweet] = useState(kiweetObj.text);
  const KiwitTextRef = doc(dbService, 'kiweets', `${kiweetObj.id}`);
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((prev) => !prev);
  const toggleEditing = () => {
    setEditing((prev) => !prev);
    toggleOpen();
  };
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
      <Wrapper>
        <Author as="div" fontSize="0.9rem" marginBottom="0.8rem">
          <span>{displayName}</span> &bull;{' '}
          <time>{timeStamp(kiweetObj.createdAt)}</time>
          {isOwner && (
            <MenuButton onClick={toggleOpen}>
              {open ? null : <BsThreeDots />}
            </MenuButton>
          )}
          {open ? (
            <KiweetMenu
              toggleEditing={toggleEditing}
              kiweetObj={kiweetObj}
              KiwitTextRef={KiwitTextRef}
              isOpen={open}
              toggleOpen={toggleOpen}
            />
          ) : null}
        </Author>
        {editing ? (
          <>
            {isOwner && (
              <>
                <EditForm onSubmit={onSubmit}>
                  <TextInput
                    value={newKiweet}
                    required
                    placeholder="Edit your kiwit"
                    onChange={onChange}
                  />
                  <ButtonWrapper>
                    <SubmitButton type="submit" value="Update" />
                    <CancelButton onClick={toggleEditing}>Cancel</CancelButton>
                  </ButtonWrapper>
                </EditForm>
              </>
            )}
          </>
        ) : (
          <KiweetText fontSize="1rem">{kiweetObj.text}</KiweetText>
        )}
        {kiweetObj.attachmentUrl && (
          <Img src={kiweetObj.attachmentUrl} alt="" />
        )}
      </Wrapper>
    </div>
  );
};

export default Kiweet;

const KiweetText = styled(Text)`
  line-height: 1.3rem;
  & + div {
    margin-bottom: 1rem;
  }
`;

const Img = styled.img`
  margin-top: 1.5rem;
  border-radius: 1.5rem;
  border: solid 1px #ccc;
`;

const Author = styled(Text)`
  color: #bbb;
  span {
    color: #000;
  }
`;

const MenuButton = styled.button`
  float: right;
  svg {
    padding: 0.2rem;
    border-radius: 50%;
    &:hover {
      cursor: pointer;
      background-color: rgba(222, 238, 241, 0.8);
      color: #128b72;
      transition: 0.2s;
    }
  }
`;

const Wrapper = styled.div`
  padding: 1.5rem;
  border-bottom: solid 1px #eee;
  position: relative;
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextInput = styled.textarea`
  overflow-wrap: break-word;
  width: inherit;
  border-bottom: solid 1px #eee;
  font-size: 1rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CancelButton = styled.button`
  background-color: #eee;
  font-size: 1rem;
  padding: 0 1.3rem;
  border-radius: 1.5rem;
  margin-left: 0.5rem;
  &:hover {
    cursor: pointer;
    background-color: rgb(227, 227, 227);
    transition: 0.2s;
  }
`;
