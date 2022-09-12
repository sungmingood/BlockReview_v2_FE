import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import api from "../../AxiosConfig";
import BackArrow from "../layouts/BackArrow";
import StoreInfo from "./sections/StoreInfo";
import StoreReview from "./sections/StoreReview";
import {StoreInfoType} from "../../types/types";
import {_serviceContract} from "../../abi/modules/ethers";
import Spinner from "../layouts/Spinner";

function StoreDetail() {
  const [StoreData, setStoreData] = useState<StoreInfoType[]>([]);
  const [Reviews, setReviews] = useState<string[]>([]);
  const [SpinnerFlag, setSpinnerFlag] = useState<boolean>(false);

  const params = useParams();
  useEffect(() => {
    getStoreDetail();
  }, []);

  const getStoreDetail = async () => {
    try {
      const storeInfo = await api.get(`/store/detail/${params.id}`);
      const _getReview = await _serviceContract.functions.getReview_ByStore(
        storeInfo.data.id
      );

      setReviews(_getReview);
      setStoreData([storeInfo.data]);
      setSpinnerFlag(true);
    } catch (error) {}
  };

  return (
    <Box>
      {SpinnerFlag ? (
        <>
          <BackArrow />
          <StoreInfo StoreData={StoreData} />
          <StoreReview Reviews={Reviews} />
        </>
      ) : (
        <Spinner />
      )}
    </Box>
  );
}

export default StoreDetail;

const Box = styled.div`
  padding-top: 50px;
  padding-bottom: 30px;
`;
