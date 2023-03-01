import { useState, useContext } from 'react';
import WritingInput from '../components/write/WritingInput';
import styled from 'styled-components';
import { DataContext } from '../App';
import { useNavigate } from 'react-router-dom';

const WritingPage = () => {
  const { data, setData } = useContext(DataContext);
  const navigate = useNavigate();
  const [writeInput, setWriteInput] = useState({
    title: '',
    category: '',
    price: '',
    desc: '',
  });
  const [fileImage, setFileImage] = useState('');

  const onSaveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.value);
  };

  const onChangeWriteInput = (e) => {
    setWriteInput({
      ...writeInput,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`
      이미지: ${fileImage},
      제목: ${writeInput.title},
      카테고리: ${writeInput.category},
      가격: ${writeInput.price},
      설명: ${writeInput.desc}
      `);
    setData([
      ...data,
      {
        id: data[data.length - 1].id + 1,
        title: writeInput.title,
        category: writeInput.category,
        price: writeInput.price,
        img: fileImage,
        desc: writeInput.desc,
      },
    ]);
    navigate('/');
  };

  return (
    <>
      <WriteContainer>
        <h3>내 물건 팔기</h3>
        <hr />
        <WriteForm onSubmit={onSubmit}>
          <WriteImgBox>
            <WritingInput
              title="이미지"
              division="input"
              name="image"
              type="file"
              accept="image/*"
              onChange={onSaveFileImage}
              required
            />
            {fileImage && <WriteImg src={fileImage} />}
          </WriteImgBox>
          <WritingInput
            title="제목"
            division="input"
            name="title"
            type="text"
            placeholder="제목을 입력하세요."
            onChange={onChangeWriteInput}
            required
          />
          <WritingInput
            title="카테고리"
            division="select"
            name="category"
            onChange={onChangeWriteInput}
            required
          />
          <WritingInput
            title="가격"
            division="input"
            name="price"
            type="number"
            placeholder="가격을 입력하세요."
            onChange={onChangeWriteInput}
            required
          />
          <WritingInput
            title="자세한 설명"
            division="textarea"
            name="desc"
            onChange={onChangeWriteInput}
            required
            textarea
          />
          <WriteSubmitBtn>작성완료</WriteSubmitBtn>
        </WriteForm>
      </WriteContainer>
    </>
  );
};

const WriteContainer = styled.div`
  height: 120vh;
  width: 40vw;
  margin: 0 auto;
  margin-top: 170px;
`;

const WriteImgBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const WriteImg = styled.img`
  margin: 30px;
  height: 30%;
  width: 30%;
`;
const WriteForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const WriteSubmitBtn = styled.button`
  cursor: pointer;
  margin-top: 30px;
  padding: 14px;
  background-color: #ff8a3d;
  border-radius: 30px;
  border: none;
  font-size: 15px;
  font-weight: bold;
  color: white;
`;

export default WritingPage;
