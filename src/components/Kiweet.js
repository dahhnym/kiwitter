import { dbService } from 'fbase';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { Text } from 'routes/Auth';
import { BsThreeDots } from 'react-icons/bs';
import KiweetMenu from './KiweetMenu';
import { timeStamp } from 'utils/timeStamp';

const Kiweet = ({ kiweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newKiweet, setNewKiweet] = useState(kiweetObj.text);
  const KiwitTextRef = doc(dbService, 'kiwits', `${kiweetObj.id}`);

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
        <Wrapper>
          <Author as="div" fontSize="0.9rem" marginBottom="0.8rem">
            <span>작성자</span> &bull;{' '}
            <time>{timeStamp(kiweetObj.createdAt)}</time>
            {isOwner && (
              <button>
                {/* <KiweetMenu
                toggleEditing={toggleEditing}
                kiweetObj={kiweetObj}
                KiwitTextRef={KiwitTextRef}
              >
                <BsThreeDots />
              </KiweetMenu> */}
                <BsThreeDots />
              </button>
            )}
          </Author>
          <KiweetText fontSize="1rem">{kiweetObj.text}</KiweetText>
          {kiweetObj.attachmentUrl && (
            <Img src={kiweetObj.attachmentUrl} alt="" />
          )}
        </Wrapper>
      )}
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
  button {
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
  }
`;

const Wrapper = styled.div`
  padding: 1.5rem;
  border-bottom: solid 1px #eee;
`;
