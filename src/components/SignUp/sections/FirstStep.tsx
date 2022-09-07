import React from "react";
import styled from "styled-components";
import {SignUpSetType} from "../../../types/types";
import Button from "../../layouts/Button";

function FirstStep({setStep, setUserType}: SignUpSetType) {
  return (
    <Container>
      <Button
        label="점주 회원"
        onClick={() => {
          setUserType(0);
          setStep(2);
        }}
      />
      <Button
        label="일반 회원"
        onClick={() => {
          setUserType(1);
          setStep(2);
        }}
      />
    </Container>
  );
}

export default FirstStep;

const Container = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 900px;
  button {
    margin-bottom: 50px;
  }
`;
