import React from "react";
import styled from "styled-components";

function HowTo() {
  return (
    <div>
      <Title>사용법</Title>
      <TextBox>
        <Text>
          사이트 이용 시 지갑(Metamask)이 필요합니다.
          <br />
          만약 지갑(Metamask)이 없다면
          <br />
          <a href="https://metamask.io/download/" target="_blank">
            여기
          </a>
          를 클릭해 다운로드를 진행해 주세요.
        </Text>
        <Text>
          회원가입 및 사이트 이용 시 Goerli가 필요합니다.
          <br />
          <a href="https://goerlifaucet.com/" target="_blank">
            여기
          </a>
          를 클릭해 무료 Goerli를 받은 후 이용해 주세요.
          <br />
          (본 사이트는 Goerli 테스트 네트워크를 사용합니다.)
        </Text>
        <Text>
          본 사이트는 블록체인 리뷰 사이트입니다. <br />
          유저의 리뷰는 NFT화 되어
          <br />
          유저 고유의 자산으로 투명성과 신뢰성을 제공합니다.
        </Text>
      </TextBox>
    </div>
  );
}

export default HowTo;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid gray;
  padding-bottom: 20px;
`;

const TextBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin-bottom: 30px;
  p {
    width: 380px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.45;
  a {
    color: blue;
    text-decoration: underline;
  }
`;
