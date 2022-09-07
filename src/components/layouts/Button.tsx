import React from "react";
import styled from "styled-components";
import {BtnType} from "../../types/types";

function Button({label, disabled, onClick}: BtnType) {
  return (
    <ButtonBox
      onClick={onClick}
      className={disabled ? "disabled" : ""}
      disabled={disabled}
    >
      {label}
    </ButtonBox>
  );
}

export default Button;

const ButtonBox = styled.button`
  width: 100%;
  height: 72px;
  border: 1px solid #a229fe;
  border-radius: 25px;
  background-color: white;
  font-size: 20px;
  color: #a229fe;
  :hover {
    background-color: #f6f5ff;
  }
  &.disabled {
    border-color: #f4f3fe;
    background-color: #f4f3fe;
    color: #c5c0db;
  }
`;
