import React from "react";
import styled from "styled-components";
import {StoreType} from "../../types/types";

function StoreLayout({name, imgUrl, reviews, address}: StoreType) {
  return (
    <LayoutBox className="storeBox">
      <img src={imgUrl} />
      <div className="info">
        <Title>
          <h1>{name}</h1>
          {/* <h2>{reviews}</h2> */}
        </Title>
        <h4>{address}</h4>
      </div>
    </LayoutBox>
  );
}

export default StoreLayout;

const LayoutBox = styled.div`
  img {
    width: 100%;
    height: 300px;
  }
  .info {
    padding-top: 10px;
    line-height: 1.45;
    h1 {
      font-size: 23px;
      font-weight: bold;
    }
    h2 {
      color: lightsalmon;
      font-size: 20px;
      font-weight: 700;
    }
    h4 {
      font-size: 15px;
      color: gray;
      font-weight: 500;
    }
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
