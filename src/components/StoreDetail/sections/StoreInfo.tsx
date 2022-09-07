import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import StarEmptyIcon from "../../../assets/images/star_empty_icon.png";
import StarFullIcon from "../../../assets/images/star_full_icon.png";
import Pencil_icon from "../../../assets/images/pencil_icon.png";
import {StoreInfoType} from "../../../types/types";

function StoreInfo({StoreData}: {StoreData: StoreInfoType[]}) {
  const navi = useNavigate();

  return (
    <>
      {StoreData.map((item) => (
        <div key={item.id}>
          <ImgBox>
            <img src={item.imgUrl} />
          </ImgBox>

          <InfoBox>
            <TopInfo>
              <h1>{item.name}</h1>
              <div
                onClick={() => {
                  navi(`/review/write/${item.id}`);
                }}
              >
                <img src={Pencil_icon} />
                <span>리뷰쓰기</span>
              </div>
            </TopInfo>

            <table>
              <tbody>
                <tr>
                  <th>소개</th>
                  <td>{item.description}</td>
                </tr>
                <tr>
                  <th>주소</th>
                  <td>{item.address}</td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{item.tel}</td>
                </tr>
                <tr>
                  <th>카테고리</th>
                  <td>
                    {item.category == 0
                      ? "음식점"
                      : item.category == 1
                      ? "카페"
                      : item.category == 2
                      ? "레저"
                      : item.category == 3
                      ? "숙박"
                      : item.category == 4
                      ? "학원"
                      : item.category == 5
                      ? "기타"
                      : ""}
                  </td>
                </tr>
              </tbody>
            </table>
          </InfoBox>
        </div>
      ))}
    </>
  );
}

export default StoreInfo;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  img {
    width: 350px;
    height: 300px;
  }
`;

const InfoBox = styled.div`
  width: 700px;
  margin: 0 auto;
  line-height: 1.45;
  th {
    text-align: left;
    width: 100px;
    padding: 15px 0;
    color: gray;
  }
  td {
    text-align: left;
    font-size: 15px;
    width: 85%;
  }
`;

const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid lightgray;
  h1 {
    font-size: 27px;
    font-weight: 500;
    line-height: 1;
  }
  div {
    margin-bottom: 3px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    :hover {
      span {
        color: #a229fe;
      }
    }
    img {
      width: 33px;
      margin-bottom: 5px;
    }
    span {
      font-size: 14px;
      color: gray;
    }
  }
`;
