import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import ArrowIcon from "../../assets/images/arrow_left_icon.png";

function BackArrow() {
  const navi = useNavigate();

  return (
    <Box
      onClick={() => {
        navi(-1);
      }}
    >
      <img src={ArrowIcon} />
    </Box>
  );
}

export default BackArrow;

const Box = styled.div`
  position: absolute;
  left: 55px;
  cursor: pointer;
  img {
    width: 35px;
  }
`;
