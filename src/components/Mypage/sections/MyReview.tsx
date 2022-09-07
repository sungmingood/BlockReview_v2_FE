import React, {useEffect, useState} from "react";
import styled from "styled-components";
import BackArrow from "../../layouts/BackArrow";
import LikeEmptyIcon from "../../../assets/images/like_empty_icon.png";
import LikeFullIcon from "../../../assets/images/like_full_icon.png";
import Button from "../../layouts/Button";
import ModalOverlay from "../../layouts/ModalOverlay";
import Price from "./Price";
import {useNavigate, useParams} from "react-router-dom";
import {_nftContract, _serviceContract} from "../../../abi/modules/ethers";
import {ethers} from "ethers";
import {StoreInfoType, UserInfoType} from "../../../types/types";
import api from "../../../AxiosConfig";
import Spinner from "../../layouts/Spinner";

function MyReview({UserInfo}: {UserInfo: UserInfoType[]}) {
  const [Like, setLike] = useState<string>("1");
  const [ReviewData, setReviewData] = useState<any>([]);
  const [ReviewPrice, setReviewPrice] = useState<string>("");
  const [StoreData, setStoreData] = useState<StoreInfoType>();
  const [ModalFlag, setModalFlag] = useState<boolean>(false);
  const [BtnFlag, setBtnFlag] = useState<boolean>(false);
  const [SpinnerFlag, setSpinnerFlag] = useState<boolean>(false);
  const params = useParams();
  const navi = useNavigate();
  useEffect(() => {
    getReviewData();
  }, []);

  useEffect(() => {
    if (!!!ReviewPrice || ReviewPrice == "0" || ReviewPrice == "0.") {
      setBtnFlag(true);
    } else {
      setBtnFlag(false);
    }
  }, [ReviewPrice]);

  const getReviewData = async () => {
    try {
      const _getReviewData = await _serviceContract.functions.getReview_ById(
        params.id
      );

      const getReviewStore = await api.get(
        `/store/detail/${_getReviewData[0].storeId}`
      );

      setReviewData(_getReviewData);

      setStoreData(getReviewStore.data);
      setSpinnerFlag(true);
    } catch (error) {}
  };

  const registerReviewSale = async () => {
    const forEther = ethers.utils.parseEther(ReviewPrice);
    const price = forEther.toString();

    try {
      setBtnFlag(true);
      const _estimateGasLimit =
        await _serviceContract.estimateGas.registerForSale(
          params.id,
          price,
          UserInfo[0].signature
        );
      const _callStaticForSale =
        await _serviceContract.callStatic.registerForSale(
          params.id,
          price,
          UserInfo[0].signature,
          {
            gasLimit: _estimateGasLimit,
          }
        );
      const _forSale = await _serviceContract.functions.registerForSale(
        params.id,
        price,
        UserInfo[0].signature,
        {
          gasLimit: _estimateGasLimit,
        }
      );
      setTimeout(() => {
        window.open(
          `https://goerli.etherscan.io/tx/${_forSale.hash}`,
          "_blank"
        );
      }, 2000);
      setModalFlag(false);
    } catch (error) {
      alert("판매 등록을 실패하셨습니다.");
      setModalFlag(false);
      setBtnFlag(false);
    }
  };

  const handleWithdrawSale = async () => {
    try {
      const _withdrawSale = await _serviceContract.functions.withdrawSale(
        params.id,
        UserInfo[0].signature
      );
      setTimeout(() => {
        window.open(
          `https://goerli.etherscan.io/tx/${_withdrawSale.hash}`,
          "_blank"
        );
      }, 2000);
    } catch (error) {
      alert("판매 철회를 실패하였습니다.");
    }
  };

  return (
    <>
      {SpinnerFlag ? (
        <Box>
          <BackArrow />
          {ReviewData.map((item: any) => (
            <div key={item.nftId}>
              <Top>
                <h2
                  onClick={() => {
                    navi(`/store/${StoreData?.id}`);
                  }}
                >
                  {StoreData?.name}
                </h2>
                <div className="like">
                  <img
                    src={
                      item.likedUser.length == 0 ? LikeEmptyIcon : LikeFullIcon
                    }
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
                label={item.price._hex == "0x00" ? "판매 등록" : "판매 철회"}
                onClick={() => {
                  if (item.price._hex !== "0x00") {
                    handleWithdrawSale();
                  } else {
                    setModalFlag(true);
                  }
                }}
              />
            </div>
          ))}
        </Box>
      ) : (
        <Spinner />
      )}

      {ModalFlag && (
        <>
          <ModalOverlay />
          <Price
            setModalFlag={setModalFlag}
            setReviewPrice={setReviewPrice}
            ReviewPrice={ReviewPrice}
            BtnFlag={BtnFlag}
            registerReviewSale={registerReviewSale}
          />
        </>
      )}
    </>
  );
}

export default MyReview;

const Box = styled.div`
  width: 700px;
  margin: 0 auto;
  padding-top: 50px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    cursor: pointer;
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
