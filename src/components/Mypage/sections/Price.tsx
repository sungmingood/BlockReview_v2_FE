import React, {Dispatch, SetStateAction} from "react";
import styled from "styled-components";
import Button from "../../layouts/Button";
import XIcon from "../../../assets/images/x_icon.png";

function Price({
  setModalFlag,
  setReviewPrice,
  registerReviewSale,
  ReviewPrice,
  BtnFlag,
}: {
  setModalFlag: Dispatch<SetStateAction<boolean>>;
  setReviewPrice: Dispatch<SetStateAction<string>>;
  ReviewPrice: string;
  BtnFlag: boolean;
  registerReviewSale: () => void;
}) {
  return (
    <Box>
      <Header>
        <img
          src={XIcon}
          onClick={() => {
            setReviewPrice("0");
            setModalFlag(false);
          }}
        />
      </Header>
      <InputBox>
        <input
          type="text"
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value
              .replace(/[^0-9.]/g, "")
              .replace(/(\..*)\./g, "$1");
          }}
          placeholder="금액 입력"
          onChange={(e) => {
            setReviewPrice(e.currentTarget.value);
          }}
        />
        <span>ETH</span>
      </InputBox>
      <Button
        label="등록하기"
        onClick={registerReviewSale}
        disabled={BtnFlag}
      />
    </Box>
  );
}

export default Price;

const Box = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  border-radius: 5px;
  z-index: 200;
  background-color: white;
`;

const Header = styled.div`
  text-align: end;
  img {
    width: 25px;
  }
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  span {
    font-size: 18px;
    font-weight: 500;
  }
  input {
    width: 75%;
    padding: 10px;
    text-align: end;
    margin-right: 10px;
    border: 1px solid lightgray;
    border-radius: 10px;
  }
`;
