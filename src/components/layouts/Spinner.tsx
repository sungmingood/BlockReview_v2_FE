import React from "react";
import styled from "styled-components";

const Spinner = () => {
  return (
    <SpinnerBox>
      <div />
    </SpinnerBox>
  );
};
export default Spinner;

const SpinnerBox = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  div {
    height: 60px;
    width: 60px;
    position: relative;
    top: 3px;
    display: inline-block;
    border: 3px solid blue;
    border-radius: 50%;
    border-top-color: transparent;
    animation: rotate 1s linear infinite;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
