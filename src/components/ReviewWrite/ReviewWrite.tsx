import {NFTStorage} from "nft.storage";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import {_authContract, _serviceContract} from "../../abi/modules/ethers";
import {UserInfoType} from "../../types/types";
import BackArrow from "../layouts/BackArrow";
import Button from "../layouts/Button";

function ReviewWrite({UserInfo}: {UserInfo: UserInfoType[]}) {
  const [Title, setTitle] = useState<string>("");
  const [Des, setDes] = useState<string>("");
  const [BtnFlag, setBtnFlag] = useState<boolean>(true);
  const params = useParams();
  const navi = useNavigate();

  const nftStorage: NFTStorage = new NFTStorage({
    token: process.env.REACT_APP_NFTSTORAGE_TOKEN as string,
  });

  useEffect(() => {
    if (Title && Des) {
      setBtnFlag(false);
    } else {
      setBtnFlag(true);
    }
  }, [Title, Des]);

  const uploadIPFS = async () => {
    try {
      const metaData = await nftStorage.store({
        name: Title,
        description: Des,
        image: new File([""], "", {type: "image/*"}),
      });
      let metaUri = metaData.url.split("ipfs://")[1];

      return `https://ipfs.io/ipfs/${metaUri}`;
    } catch (error) {}
  };

  const handleWriteReview = async () => {
    setBtnFlag(true);
    try {
      const IPFSUri = await uploadIPFS();
      const _estimatedGasLimit = await _serviceContract.estimateGas.writeReview(
        params.id,
        Title,
        Des,
        IPFSUri,
        UserInfo[0].signature
      );
      const _callStaticWriteReview =
        await _serviceContract.callStatic.writeReview(
          params.id,
          Title,
          Des,
          IPFSUri,
          UserInfo[0].signature,
          {
            gasLimit: _estimatedGasLimit,
          }
        );
      const _writeReview = await _serviceContract.functions.writeReview(
        params.id,
        Title,
        Des,
        IPFSUri,
        UserInfo[0].signature,
        {
          gasLimit: _estimatedGasLimit,
        }
      );
      setBtnFlag(false);
      setTimeout(() => {
        window.open(
          `https://goerli.etherscan.io/tx/${_writeReview.hash}`,
          "_blank"
        );
        navi(-1);
      }, 2000);
    } catch (error) {
      alert("보유 ETH 확인 후 다시 한번 시도해 주세요.");
      navi(-1);
      setBtnFlag(false);
    }
  };

  return (
    <div className="container">
      <BackArrow />
      <InputBox>
        <p>
          제목 <span>{Title.length} / 50</span>
        </p>
        <input
          type="text"
          placeholder="제목 입력"
          maxLength={50}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
          }}
          value={Title}
        />
      </InputBox>
      <InputBox>
        <p>
          내용 <span>{Des.length} / 500</span>
        </p>
        <textarea
          placeholder="내용 입력"
          maxLength={500}
          onChange={(e) => {
            setDes(e.currentTarget.value);
          }}
        />
      </InputBox>
      <Button label="작성하기" onClick={handleWriteReview} disabled={BtnFlag} />
      <WarningMsg>리뷰 작성 시 수정, 삭제가 불가능합니다.</WarningMsg>
    </div>
  );
}

export default ReviewWrite;

const WarningMsg = styled.h1`
  color: red;
  font-size: 25px;
  text-align: center;
  margin-top: 20px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
  p {
    font-size: 20px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      color: gray;
    }
  }
  input {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
  }
  textarea {
    resize: none;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
    height: 200px;
    line-height: 1.45;
  }
`;
