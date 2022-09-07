import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {
  connectMetamask,
  _authContract,
  _nftContract,
  _serviceContract,
} from "../../../abi/modules/ethers";
import api from "../../../AxiosConfig";
import Button from "../../layouts/Button";

function SecondStep({UserType}: {UserType: number}) {
  const [Email, setEmail] = useState<string>("");
  const [EmailFailMsg, setEmailFailMsg] = useState<string>("");
  const [Phone, setPhone] = useState<string>("");
  const [StoreNum, setStoreNum] = useState<string | null>("");
  const [BtnFlag, setBtnFlag] = useState<boolean>(true);

  const navi = useNavigate();

  useEffect(() => {
    if (UserType == 1) {
      setStoreNum(null);
    }
  }, [UserType]);

  useEffect(() => {
    if (
      UserType == 0 &&
      Email &&
      Phone.length >= 10 &&
      StoreNum?.length == 11
    ) {
      setBtnFlag(false);
    } else if (UserType == 1 && Email && Phone.length >= 10) {
      setBtnFlag(false);
    } else {
      setBtnFlag(true);
    }
  }, [Email, Phone, StoreNum, UserType]);

  const checkEmail = (value: string) => {
    const regExp =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,}$/i;
    // 형식에 맞는 경우 true 리턴
    if (regExp.test(value)) {
      setEmail(value);
      setEmailFailMsg("");
    } else {
      setEmail("");
      setEmailFailMsg("아이디가 올바르지 않습니다.");
    }
  };

  const handleSignUp = async () => {
    setBtnFlag(true);
    try {
      const connect = await connectMetamask("지갑을 연결해 주세요.");
      const _getMsgHash = await _authContract.functions.getMsgHash([
        connect,
        Email,
      ]);
      const _getSignature = await window.ethereum.request({
        method: "personal_sign",
        params: [connect, _getMsgHash._msgHash],
      });
      const _estimatedGasLimit = await _authContract.estimateGas.registerUser(
        _getSignature,
        [connect, Email]
      );
      const _callStaticRegisterUser =
        await _authContract.callStatic.registerUser(
          _getSignature,
          [connect, Email],
          {
            gasLimit: _estimatedGasLimit,
          }
        );
      const _registerUser = await _authContract.functions.registerUser(
        _getSignature,
        [connect, Email],
        {
          gasLimit: _estimatedGasLimit,
        }
      );
      const payload = {
        eoa: connect,
        signature: _getSignature,
        email: Email,
        phoneNumber: Phone,
        userType: UserType,
        crnNumber: StoreNum,
      };
      const signUp = await api.post("/user/register", payload);
      navi("/signin");
      setBtnFlag(false);
    } catch (error) {
      alert(
        "회원가입에 실패하였습니다. 계정 정보와 지갑 확인 후 다시 한번 시도해 주세요."
      );
      window.location.reload();
    }
  };

  return (
    <>
      <InputBox>
        <p>아이디 (이메일)</p>
        <input
          type="text"
          placeholder="이메일 입력"
          onBlur={(e) => checkEmail(e.currentTarget.value)}
        />
        {EmailFailMsg ? <h2 className="failMsg">{EmailFailMsg}</h2> : <></>}
      </InputBox>
      <InputBox>
        <p>휴대전화</p>
        <input
          type="text"
          placeholder="전화번호 입력"
          maxLength={11}
          onChange={(e) => {
            setPhone(e.currentTarget.value);
          }}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1");
          }}
        />
      </InputBox>
      {UserType == 0 ? (
        <InputBox>
          <p>사업자 번호</p>
          <input
            type="text"
            maxLength={11}
            placeholder="사업자 번호 입력"
            onChange={(e) => setStoreNum(e.currentTarget.value)}
            onInput={(e) => {
              e.currentTarget.value = e.currentTarget.value
                .replace(/[^0-9.]/g, "")
                .replace(/(\..*)\./g, "$1");
            }}
          />
        </InputBox>
      ) : (
        <></>
      )}
      <BtnBox>
        <Button label="가입하기" onClick={handleSignUp} disabled={BtnFlag} />
      </BtnBox>
    </>
  );
}

export default SecondStep;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  p {
    font-size: 20px;
    margin-bottom: 10px;
  }
  input {
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    font-size: 16px;
  }
`;
const BtnBox = styled.div`
  margin-top: 50px;
`;
