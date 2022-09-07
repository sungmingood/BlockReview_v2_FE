import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import {signer, _nftContract, _serviceContract} from "../../abi/modules/ethers";
import {UserInfoType} from "../../types/types";
import Spinner from "../layouts/Spinner";
import Info from "./sections/Info";
import Review from "./sections/Review";

function MyPage({UserInfo}: {UserInfo: UserInfoType[]}) {
  const [Active, setActive] = useState<string>("계정");
  const [Reviews, setReviews] = useState<any>([]);
  const [LikedReviews, setLikedReviews] = useState<any>([]);
  const [SpinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const category = ["계정", "리뷰", "점포"];

  useEffect(() => {
    getReviews();
  }, []);

  const getReviews = async () => {
    const address = await signer.getAddress();
    const _getMyReviews = await _serviceContract.functions.getReview_ByOwner(
      address
    );

    const _getAllReviews = await _serviceContract.functions.getEveryReview();
    const likedReviews = _getAllReviews[0].filter(
      (item: any) => item.likedUser[0] == address
    );

    const reviews = _getMyReviews[0].filter((item: any) => item.title != "");

    setLikedReviews(likedReviews);
    setReviews(reviews);
    setSpinnerFlag(true);
  };

  const handleCategoryClick = (e: React.SyntheticEvent<HTMLButtonElement>) => {
    if (e.currentTarget.id == "점포") {
      if (UserInfo[0].userType == 0 && UserInfo[0].store !== null) {
        navi(`/store/${UserInfo[0].store.id}`);
      } else if (UserInfo[0].userType == 0 && UserInfo[0].store == null) {
        alert("등록한 점포가 없습니다.");
      } else {
        return;
      }
    }
    setActive(e.currentTarget.id);
  };

  const navi = useNavigate();

  return (
    <div className="container">
      {SpinnerFlag ? (
        <>
          <BtnBox>
            {category.map((item, idx) => (
              <button
                key={idx}
                id={item}
                onClick={handleCategoryClick}
                className={Active == item ? "active" : ""}
              >
                {item}
              </button>
            ))}
          </BtnBox>
          {Active == "계정" ? (
            <Info UserInfo={UserInfo} />
          ) : Active == "리뷰" ? (
            <Review Reviews={Reviews} LikedReviews={LikedReviews} />
          ) : (
            <></>
          )}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default MyPage;

const BtnBox = styled.div`
  border-bottom: 2px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    font-size: 25px;
    font-weight: 700;
    background-color: white;
    border: none;
    position: relative;
    top: 2px;
    width: 33.3333%;
    border-bottom: 2px solid lightgray;
    color: lightgray;
    border-color: gray;
    &.active {
      color: #a229fe;
      border-color: #a229fe;
    }
  }
`;
