import {ethers} from "ethers";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {_serviceContract} from "../../../abi/modules/ethers";
import LikeEmptyIcon from "../../../assets/images/like_empty_icon.png";
import LikeFullIcon from "../../../assets/images/like_full_icon.png";

function Review({Reviews, LikedReviews}: any) {
  const navi = useNavigate();

  return (
    <>
      <Title>나의 리뷰</Title>
      {Reviews.length > 0 ? (
        <>
          {Reviews.map((item: any) => (
            <ReviewBox
              key={item.nftId}
              onClick={(e) => {
                navi(`/myreview/${item.id._hex}`);
              }}
            >
              <h1>{item.title}</h1>
              <Like>
                <div>
                  <img
                    src={
                      item.likedUser.length !== 0 ? LikeFullIcon : LikeEmptyIcon
                    }
                  />
                  <div>{item.likedUser.length}</div>
                </div>
                <BuyBtn
                  className={item.price._hex !== "0x00" ? "" : "disabled"}
                >
                  판매 중
                </BuyBtn>
              </Like>
              <h3>2022-08-22</h3>
            </ReviewBox>
          ))}
        </>
      ) : (
        <NoReviews>작성한 리뷰가 없습니다.</NoReviews>
      )}
      <Title>좋아요한 리뷰</Title>

      {LikedReviews.length > 0 ? (
        <>
          {LikedReviews.map((item: any) => (
            <ReviewBox
              key={item.nftId}
              onClick={(e) => {
                navi(`/review/${item.id._hex}`);
              }}
            >
              <h1>{item.title}</h1>
              <Like>
                <div>
                  <img
                    src={
                      item.likedUser.length !== 0 ? LikeFullIcon : LikeEmptyIcon
                    }
                  />
                  <div>{item.likedUser.length}</div>
                </div>
                <BuyBtn
                  className={item.price._hex !== "0x00" ? "" : "disabled"}
                >
                  판매 중
                </BuyBtn>
              </Like>
              <h3>2022-08-22</h3>
            </ReviewBox>
          ))}
        </>
      ) : (
        <NoReviews>좋아요한 리뷰가 없습니다.</NoReviews>
      )}
    </>
  );
}

export default Review;

const ReviewBox = styled.div`
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 5px;
  padding: 10px;
  margin: 10px 0;
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
const Title = styled.h1`
  margin-top: 20px;
  font-size: 25px;
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
`;
