import React from "react";
import styled from "styled-components";

function ModalOverlay() {
  return <Box />;
}

export default ModalOverlay;

const Box = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  background: #000;
  opacity: 0.7;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
