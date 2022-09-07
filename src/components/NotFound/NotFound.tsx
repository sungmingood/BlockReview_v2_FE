import React from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Button from "../layouts/Button";

function NotFound() {
  const navi = useNavigate();
  return (
    <Box className="container">
      <p>페이지를 찾을 수 없습니다.</p>
      <Button label="홈으로" onClick={() => navi("/")} />
    </Box>
  );
}

export default NotFound;

const Box = styled.div`
  p {
    font-size: 40px;
  }
  button {
    margin-top: 50px;
  }
`;
