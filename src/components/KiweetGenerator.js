import { dbService, storageService } from 'fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import styled from 'styled-components';
import { ImFilePicture } from 'react-icons/im';
import { IoMdClose } from 'react-icons/io';

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
    <Form onSubmit={onSubmit}>
      <TextInputContainer>
        <TextInput
          type="text"
          placeholder="What's on your mind?"
          maxLength={200}
          onChange={onChange}
          value={kiweet}
        />
        {attachment && (
          <AttachmentWrapper>
            <img src={attachment} width="40%" alt="attachment" />
            <button onClick={onClearAttachment}>
              <IoMdClose fontSize="1.2rem" color="#fff" />
            </button>
          </AttachmentWrapper>
        )}
      </TextInputContainer>
      <ButtonWrapper>
        <label htmlFor="fileUpload">
          <ImFilePicture fontSize="1.2rem" color="#128b72" />
        </label>
        <FileInput
          type="file"
          id="fileUpload"
          accept="image/*"
          onChange={onFileChange}
        />
        <SubmitButton type="submit" value="Kiweet" />
      </ButtonWrapper>
    </Form>
  );
};

export default KiweetGenerator;

const Form = styled.form`
  border-bottom: solid 1px #eee;
  box-sizing: border-box;
  padding: 1rem;
`;

const TextInputContainer = styled.div`
  margin-bottom: 1rem;
`;

const TextInput = styled.textarea`
  box-sizing: border-box;
  padding: 0.8rem;
  width: 100%;
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  &:focus {
    outline: none;
  }
`;

const AttachmentWrapper = styled.div`
  position: relative;
  button {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.6);
    position: absolute;
    top: 1rem;
    left: 1rem;
    &:hover {
      cursor: pointer;
      background-color: rgba(0, 0, 0, 0.8);
    }
    svg {
      vertical-align: bottom;
    }
  }
  img {
    border-radius: 1rem;
    margin-bottom: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  label {
    box-sizing: border-box;
    border-radius: 50%;
    padding: 0.7rem;
    margin-right: 0.7rem;
    &:hover {
      cursor: pointer;
      background-color: rgba(222, 238, 241, 0.8);
    }
  }
`;

const FileInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.input`
  background-color: #128b72;
  color: #fff;
  box-sizing: border-box;
  height: 2.3rem;
  padding: 0 1.3rem;
  border-radius: 1.5rem;
  font-size: 0.9rem;
  margin-top: ${(props) => props.marginTop};
  &:hover {
    cursor: pointer;
    background-color: rgb(16, 127, 103);
    transition: 0.2s;
  }
`;
