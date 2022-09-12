import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {connectMetamask, signer} from "../../abi/modules/ethers";
import api from "../../AxiosConfig";
import {getCookie, setCookie} from "../../hooks/Cookie";
import Button from "../layouts/Button";

function SignIn() {
  const [Email, setEmail] = useState<string>("");
  const [EmailFailMsg, setEmailFailMsg] = useState<string>("");
  const token = getCookie("blockReview");
  const navi = useNavigate();

  useEffect(() => {
    if (!!token) {
      navi("/mypage");
    }
  }, [token]);

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

  const handleSignIn = async () => {
    const connect = await connectMetamask("지갑을 연결해 주세요.");
    const payload = {
      email: Email as string,
      eoa: connect as string,
    };
    try {
      const signIn = await api.post("/user/login", payload);

      setCookie("blockReview", signIn.data.accessToken, {
        maxAge: 60 * 60 * 2,
      });

      api.defaults.headers.common["Authorization"] =
        "Bearer " + signIn.data.accessToken;
      navi("/");
    } catch (error) {
      alert("계정 정보를 다시 한번 확인해 주세요.");
    }
  };

  return (
    <div className="container">
      <InputBox>
        <p>아이디 (이메일)</p>
        <input
          type="text"
          placeholder="이메일 입력"
          onBlur={(e) => checkEmail(e.currentTarget.value)}
        />
        {EmailFailMsg ? <h2 className="failMsg">{EmailFailMsg}</h2> : <></>}
      </InputBox>
      <BtnBox>
        <Button label="로그인" onClick={handleSignIn} disabled={!Email} />
        <Button
          label="회원가입"
          onClick={() => {
            navi("/signup");
          }}
        />
      </BtnBox>
    </div>
  );
}

export default SignIn;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
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
  button:last-child {
    margin-top: 50px;
  }
`;
