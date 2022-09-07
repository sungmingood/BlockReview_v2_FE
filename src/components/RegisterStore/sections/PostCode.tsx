import React from "react";
import DaumPostCode from "react-daum-postcode";
import styled from "styled-components";
import XIcon from "../../../assets/images/x_icon.png";

interface Props {
  setFlag: (Flag: boolean) => void;
  setStoreLocation: (address: string) => void;
}
function PostCode({setFlag, setStoreLocation}: Props) {
  return (
    <Box>
      <img src={XIcon} onClick={() => setFlag(false)} className="icon" />

      <DaumPostCode
        onComplete={(data) => {
          setStoreLocation(data.address);
          setFlag(false);
        }}
      />
    </Box>
  );
}

export default PostCode;

const Box = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: white;
  .icon {
    width: 20px;
    margin: 10px;
    cursor: pointer;
  }
`;
