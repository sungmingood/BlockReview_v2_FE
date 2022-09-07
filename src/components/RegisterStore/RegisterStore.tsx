import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import api from "../../AxiosConfig";
import Button from "../layouts/Button";
import ModalOverlay from "../layouts/ModalOverlay";
import PostCode from "./sections/PostCode";
import CameraIcon from "../../assets/images/camera_icon.png";
import {StoreCategoryType, UserInfoType} from "../../types/types";

function RegisterStore({UserInfo}: {UserInfo: UserInfoType[]}) {
  const storeImgInput = useRef<HTMLInputElement>(null);
  const [StoreImg, setStoreImg] = useState<Blob | string>("");
  const [StorePreviewImg, setStorePreviewImg] = useState<string>();
  const [StoreName, setStoreName] = useState<string>("");
  const [StoreDes, setStoreDes] = useState<string>("");
  const [StoreLocation, setStoreLocation] = useState<string>("");
  const [StoreDetailLocation, setStoreDetailLocation] = useState<string>("");
  const [StorePhone, setStorePhone] = useState<string>("");
  const [Active, setActive] = useState<number | null>(null);
  const [StoreLocationFlag, setStoreLocationFlag] = useState<boolean>(false);
  const [DisabledFlag, setDisabledFlag] = useState<boolean>(true);
  const storeCategory: StoreCategoryType[] = [
    {name: "음식점", id: 0},
    {name: "카페", id: 1},
    {name: "레저", id: 2},
    {name: "숙박", id: 3},
    {name: "학원", id: 4},
    {name: "기타", id: 5},
  ];

  const navi = useNavigate();

  useEffect(() => {
    if (UserInfo.length > 0 && UserInfo[0].userType == 1) {
      alert("점주 유저만 등록할 수 있습니다.");
      window.location.replace("/");
    } else if (
      UserInfo.length > 0 &&
      UserInfo[0].userType == 0 &&
      !!UserInfo[0].store
    ) {
      alert("점포는 하나만 등록할 수 있습니다.");
      window.location.replace("/");
    }
  }, [UserInfo]);

  useEffect(() => {
    if (
      StoreImg &&
      StoreName &&
      StoreDes &&
      StoreLocation &&
      StorePhone &&
      Active !== null
    ) {
      setDisabledFlag(false);
    } else {
      setDisabledFlag(true);
    }
  }, [StoreImg, StoreName, StoreDes, StoreLocation, StorePhone, Active]);

  const handleStoreImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      setStoreImg(e.currentTarget.files[0]);
      const reader = new FileReader();
      reader.readAsDataURL(e.currentTarget.files[0]);
      reader.onload = () => {
        setStorePreviewImg(reader.result as string);
      };
    }
  };

  const handleRegisterStore = async () => {
    const data = new FormData();
    data.append("file", StoreImg);
    try {
      const uploadS3Img = await api.post("/aws/s3/upload", data);

      const payload = {
        name: StoreName,
        description: StoreDes,
        address: StoreLocation + " " + StoreDetailLocation,
        tel: StorePhone,
        category: Active,
        imgUrl: uploadS3Img.data.url,
      };
      const registerStore = await api.post("/store/create", payload);
      navi("/store/list");
    } catch (error) {}
  };

  return (
    <>
      <div className="container">
        <ImgBox>
          <input
            type="file"
            style={{display: "none"}}
            ref={storeImgInput}
            onChange={handleStoreImg}
          />
          <img src={StorePreviewImg} className="img" />
          <img
            src={CameraIcon}
            alt="camera"
            onClick={() => storeImgInput.current?.click()}
            className="icon"
          />
        </ImgBox>
        <InputBox>
          <p>점포 이름</p>
          <input
            type="text"
            placeholder="이름 입력"
            onChange={(e) => setStoreName(e.currentTarget.value)}
          />
        </InputBox>

        <InputBox>
          <p>
            한줄 소개
            <Count>{StoreDes.length} / 100</Count>
          </p>
          <textarea
            placeholder="설명 입력"
            maxLength={100}
            onChange={(e) => setStoreDes(e.currentTarget.value)}
          />
        </InputBox>

        <InputBox>
          <p>주소</p>
          {StoreLocation && <h3>{StoreLocation}</h3>}
          <Button label="주소찾기" onClick={() => setStoreLocationFlag(true)} />
        </InputBox>

        <InputBox>
          <p>상세 주소(선택)</p>
          <input
            type="text"
            placeholder="상세 주소 입력"
            onChange={(e) => setStoreDetailLocation(e.currentTarget.value)}
          />
        </InputBox>

        <Info>
          <p>전화번호</p>
          <input
            type="text"
            placeholder="전화번호 입력"
            maxLength={11}
            onChange={(e) => {
              setStorePhone(e.currentTarget.value);
            }}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
            }}
          />
        </Info>

        <Info>
          <p>카테고리</p>
          <Category>
            {storeCategory.map((item) => (
              <button
                key={item.id}
                className={Active == item.id ? "active" : ""}
                onClick={() => setActive(item.id)}
              >
                {item.name}
              </button>
            ))}
          </Category>
        </Info>

        <Btn>
          <Button
            label="등록하기"
            onClick={handleRegisterStore}
            disabled={DisabledFlag}
          />
        </Btn>
      </div>

      {StoreLocationFlag && (
        <>
          <ModalOverlay />
          <PostCode
            setFlag={setStoreLocationFlag}
            setStoreLocation={setStoreLocation}
          />
        </>
      )}
    </>
  );
}

export default RegisterStore;

const ImgBox = styled.div`
  text-align: center;
  margin-bottom: 20px;
  .icon {
    position: absolute;
    width: 35px;
    cursor: pointer;
  }
  .img {
    width: 300px;
    height: 300px;
    border-radius: 100%;
    border: 1px solid black;
    padding: 10px;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  p {
    font-size: 20px;
    margin-bottom: 10px;
    position: relative;
    font-weight: 700;
  }
  input {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
  }
  h3 {
    margin-bottom: 20px;
  }
  textarea {
    resize: none;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
    line-height: 1.45;
  }
`;

const Count = styled.span`
  position: absolute;
  top: 5px;
  right: 0;
  font-size: 17px;
  font-weight: 400;
  color: gray;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  p {
    font-size: 20px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  input {
    width: 50%;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const Category = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    width: 80px;
    height: 40px;
    border-radius: 5px;
    border: 1px solid lightgray;
    background-color: white;
    font-weight: 500;
    color: gray;
    &.active {
      background-color: #f6f5ff;
      border: 1px solid #a229fe;
      color: #a229fe;
    }
  }
`;
const Btn = styled.div`
  margin-top: 50px;
`;
