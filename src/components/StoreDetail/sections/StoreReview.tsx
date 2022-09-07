import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {_serviceContract} from "../../../abi/modules/ethers";
import LikeEmptyIcon from "../../../assets/images/like_empty_icon.png";
import LikeFullIcon from "../../../assets/images/like_full_icon.png";

function StoreReview({Reviews}: any) {
  const navi = useNavigate();

  return (
    <Box>
      <Title>
        리뷰
        <span>
          (
          {Reviews.length == 0 || Reviews[0].length == []
            ? "0"
            : Reviews[0].length}
          )
        </span>
      </Title>
      {Reviews[0] !== [] ? (
        <>
          {Reviews.map((item: any) => (
            <div key={item}>
              {item.map((list: any) => (
                <div key={list.crDate}>
                  <ReviewBox
                    onClick={() => {
                      navi(`/review/${list.id._hex}`);
                    }}
                  >
                    <h1>{list.title}</h1>
                    <Like>
                      <div>
                        <img
                          src={
                            list.likedUser.length > 0
                              ? LikeFullIcon
                              : LikeEmptyIcon
                          }
                        />
                        <div>{list.likedUser.length}</div>
                      </div>
                      <BuyBtn
                        className={list.price._hex == "0x00" ? "disabled" : ""}
                      >
                        구매
                      </BuyBtn>
                    </Like>
                    <h3>2022-08-22</h3>
                  </ReviewBox>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <NoReviews>등록된 리뷰가 없습니다.</NoReviews>
      )}
    </Box>
  );
}

export default StoreReview;

const Box = styled.div`
  width: 700px;
  margin: 0 auto;
  margin-top: 50px;
`;

const Title = styled.div`
  font-size: 23px;
  font-weight: 500;
  border-bottom: 1px solid lightgray;
  line-height: 1.45;
  margin-bottom: 20px;
  span {
    color: #a229fe;
    margin-left: 7px;
  }
`;

const ReviewBox = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 10px;
  h1 {
    line-height: 1.45;
  }

  h3 {
    text-align: end;
    color: gray;
    font-weight: 400;
    margin-top: 10px;
  }
  :hover {
    background-color: #f6f5ff;
  }
`;

const Like = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  div:first-child {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      cursor: pointer;
    }
    div {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
`;

const BuyBtn = styled.div`
  border: 1px solid #a229fe;
  padding: 5px 7px;
  border-radius: 5px;
  color: #a229fe;
  font-weight: bold;
  &.disabled {
    border-color: lightgray;
    color: gray;
    font-weight: 500;
  }
`;

const NoReviews = styled.p`
  font-size: 25px;
  font-weight: 500;
  text-align: center;
  color: gray;
  padding-top: 50px;
`;
