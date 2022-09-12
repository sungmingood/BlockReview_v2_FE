import React, {useEffect, useState} from "react";
import styled from "styled-components";
import BackArrow from "../layouts/BackArrow";
import Button from "../layouts/Button";
import LikeEmptyIcon from "../../assets/images/like_empty_icon.png";
import LikeFullIcon from "../../assets/images/like_full_icon.png";
import {
  _authContract,
  _nftContract,
  _serviceContract,
} from "../../abi/modules/ethers";
import {useNavigate, useParams} from "react-router-dom";
import {ethers} from "ethers";
import {UserInfoType} from "../../types/types";
import api from "../../AxiosConfig";
import Spinner from "../layouts/Spinner";
import {serviceContract} from "../../abi/contract";

function ReviewDetail({UserInfo}: {UserInfo: UserInfoType[]}) {
  const [ReviewInfo, setReviewInfo] = useState<any>([]);
  const [StoreName, setStoreName] = useState<string>("");
  const [SpinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const [ReviewPrice, setReviewPrice] = useState<string>("");
  const [BtnFlag, setBtnFlag] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    getReviewDetail();
  }, []);

  const navi = useNavigate();

  const getReviewDetail = async () => {
    try {
      const _getReviewDetail = await _serviceContract.functions.getReview_ById(
        params.id
      );

      setReviewPrice(_getReviewDetail[0].price);
      setReviewInfo(_getReviewDetail);
      try {
        const getStoreName = await api.get(
          `/store/detail/${_getReviewDetail[0].storeId}`
        );
        setStoreName(getStoreName.data.name);
      } catch (error) {}
      setSpinnerFlag(true);
    } catch (error) {
      setSpinnerFlag(true);
    }
  };

  const handleLikeReview = async () => {
    if (ReviewInfo[0].owner.toLowerCase() == UserInfo[0].eoa) {
      alert("본인이 작성한 리뷰는 좋아요할 수 없습니다.");
      return;
    }
    try {
      const _estimatedGasLimit = await _serviceContract.estimateGas.likeReview(
        params.id,
        UserInfo[0].signature
      );

      const _callStaticLikeReview =
        await _serviceContract.callStatic.likeReview(
          params.id,
          UserInfo[0].signature,
          {
            gasLimit: _estimatedGasLimit,
          }
        );

      const _likeReview = await _serviceContract.functions.likeReview(
        params.id,
        UserInfo[0].signature,
        {
          gasLimit: _estimatedGasLimit,
        }
      );
      setTimeout(() => {
        window.open(
          `https://goerli.etherscan.io/tx/${_likeReview.hash}`,
          "_blank"
        );
      }, 2000);
      navi(-1);
    } catch (error) {
      alert("좋아요를 실패하였습니다.");
      navi(-1);
    }
  };

  const handleBuyReview = async () => {
    try {
      setBtnFlag(true);
      const _estimateGasLimitNft =
        await _nftContract.estimateGas.setApprovalForAll(
          serviceContract.address,
          true
        );
      const _callStaticNft = await _nftContract.callStatic.setApprovalForAll(
        serviceContract.address,
        true,
        {gasLimit: _estimateGasLimitNft}
      );
      const nft = await _nftContract.functions.setApprovalForAll(
        serviceContract.address,
        true,
        {gasLimit: _estimateGasLimitNft}
      );
      const _estimateGasLimit = await _serviceContract.estimateGas.saleReview(
        params.id,
        UserInfo[0].signature,
        {
          value: String(ReviewPrice),
        }
      );
      const _callStaticForSale = await _serviceContract.callStatic.saleReview(
        params.id,
        UserInfo[0].signature,
        {
          gasLimit: _estimateGasLimit,
          value: String(ReviewPrice),
        }
      );
      const _saleReview = await _serviceContract.functions.saleReview(
        params.id,
        UserInfo[0].signature,
        {
          gasLimit: _estimateGasLimit,
          value: String(ReviewPrice),
        }
      );
      setTimeout(() => {
        window.open(
          `https://goerli.etherscan.io/tx/${_saleReview.hash}`,
          "_blank"
        );
      }, 2000);
      navi(-1);
    } catch (error) {
      alert("리뷰 구매를 실패하였습니다. 잠시 후 다시 시도해 주세요.");
      setBtnFlag(false);
      navi(-1);
    }
  };

  return (
    <>
      {SpinnerFlag ? (
        <Box>
          <BackArrow />
          {ReviewInfo.map((item: any) => (
            <div key={item}>
              <Top>
                <h1>{StoreName}</h1>
                <div className="like">
                  <img
                    src={
                      item.likedUser.length == 0 ? LikeEmptyIcon : LikeFullIcon
                    }
                    onClick={handleLikeReview}
                  />
                  <div>{item.likedUser.length}</div>
                </div>
              </Top>
              <ReviewBox>
                <h1>{item.title}</h1>
                <h2>{item.description}</h2>
                <h3>
                  {new Date(
                    ethers.BigNumber.from(item.crDate).toNumber() * 1000
                  )
                    .toUTCString()
                    .replace("GMT", "UTC")}
                </h3>
              </ReviewBox>
              <Button
                label={
                  item.price._hex == "0x00"
                    ? "구매하기"
                    : `${ethers.utils.formatEther(item.price)} ETH`
                }
                onClick={handleBuyReview}
                disabled={item.price._hex == "0x00" || BtnFlag}
              />
            </div>
          ))}
        </Box>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default ReviewDetail;

const Box = styled.div`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    color: #5f84bc;
    text-decoration: underline;
    font-weight: bold;
    font-size: 30px;
  }
  .like {
    display: flex;
    align-items: center;
    img {
      width: 40px;
      cursor: pointer;
    }
    div {
      font-size: 20px;
      font-weight: bold;
      margin-left: 10px;
    }
  }
`;

const ReviewBox = styled.div`
  font-size: 18px;
  line-height: 1.45;
  margin-bottom: 25px;
  h1 {
    margin-top: 15px;
    margin-bottom: 5px;
    font-size: 20px;
    font-weight: 600;
  }
  h2 {
    font-weight: 400;
  }
  h3 {
    text-align: end;
    color: gray;
    font-weight: 400;
    margin-top: 10px;
  }
`;
