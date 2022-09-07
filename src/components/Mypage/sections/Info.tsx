import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {provider, signer, _serviceContract} from "../../../abi/modules/ethers";
import {UserInfoType} from "../../../types/types";

function Info({UserInfo}: {UserInfo: UserInfoType[]}) {
  const [Balance, setBalance] = useState<string>("");

  useEffect(() => {
    getBalance();
  }, []);
  const getBalance = async () => {
    const a = await provider.getBalance(
      "0xA23485594fe873bd3b9931d3Df7ADF0719fBcde4"
    );

    const _balance = await signer.getBalance();
    const formatEther = ethers.utils.formatEther(String(_balance));
    setBalance(formatEther);
  };

  return (
    <>
      {UserInfo.map((item: UserInfoType) => (
        <InfoBox key={item.eoa}>
          <li>
            <h1>아이디</h1>
            <p>{item.email}</p>
          </li>
          <li>
            <h1>휴대전화</h1>
            <p>{item.phoneNumber}</p>
          </li>
          {item.userType == 0 ? (
            <li>
              <h1>사업자 번호</h1>
              <p>{item.crnNumber}</p>
            </li>
          ) : (
            <></>
          )}
          <li>
            <h1>지갑주소</h1>
            <p>{item.eoa}</p>
          </li>
          <li>
            <h1>보유 ETH</h1>
            <p>{Balance}</p>
          </li>
        </InfoBox>
      ))}
    </>
  );
}

export default Info;

const InfoBox = styled.ul`
  padding: 0 50px;
  li {
    margin: 50px 0;
    display: flex;

    h1 {
      font-size: 18px;
      font-weight: 700;
      width: 150px;
    }
    p {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;
