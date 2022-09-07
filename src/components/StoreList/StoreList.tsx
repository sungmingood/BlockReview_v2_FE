import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import api from "../../AxiosConfig";
import {StoreListType, StoreType} from "../../types/types";
import Spinner from "../layouts/Spinner";
import StoreLayout from "../layouts/StoreLayout";

function StoreList() {
  const [StoreList, setStoreList] = useState<StoreListType[]>([]);
  const [SpinnerFlag, setSpinnerFlag] = useState<boolean>(false);

  useEffect(() => {
    getStoreList();
  }, []);

  const getStoreList = async () => {
    try {
      const List = await api.get(`/store`);

      setStoreList(List.data);
      setSpinnerFlag(true);
    } catch (error) {
      setSpinnerFlag(true);
    }
  };

  return (
    <>
      {SpinnerFlag ? (
        <ListBox>
          {StoreList.map((item, idx) => (
            <Link to={`/store/${item.id}`} key={idx}>
              <StoreLayout
                name={item.name}
                description={item.description}
                imgUrl={item.imgUrl}
                storeId={item.storeId}
                reviews={item.reviews.length}
                id={item.id}
                address={item.address}
              />
            </Link>
          ))}
        </ListBox>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default StoreList;

const ListBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 50px 25px 0 25px;
  a {
    color: black;
    flex: 0 0 calc(20% - 50px);
    margin: 25px;
    margin-top: 0px;
    @media (max-width: 1700px) {
      flex: 0 0 calc(25% - 50px);
      margin: 25px;
    }
    @media (max-width: 1200px) {
      flex: 0 0 calc(33% - 50px);
      margin: 25px;
    }
  }
  a:hover {
    transform: scale(1.01);
  }
`;
