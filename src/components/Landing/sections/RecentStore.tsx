import React, {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import StoreLayout from "../../layouts/StoreLayout";
import {StoreType} from "../../../types/types";
import {Pagination} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import api from "../../../AxiosConfig";
import {Link} from "react-router-dom";
import styled from "styled-components";

function RecentStore() {
  const [StoreList, setStoreList] = useState<StoreType[]>([]);

  useEffect(() => {
    getRecentStore();
  }, []);

  const getRecentStore = async () => {
    const storeList = await api("/store/recent/6");
    setStoreList(storeList.data);
  };

  return (
    <Box>
      <Title>최신 점포 목록</Title>
      <Swiper
        slidesPerView={3}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {StoreList.length !== 0 ? (
          <>
            {StoreList.map((item) => (
              <SwiperSlide key={item.id}>
                <Link to={`/store/${item.id}`}>
                  <StoreLayout
                    name={item.name}
                    address={item.address}
                    imgUrl={item.imgUrl}
                  />
                </Link>
              </SwiperSlide>
            ))}
          </>
        ) : (
          <h1></h1>
        )}
      </Swiper>
    </Box>
  );
}

export default RecentStore;

const Box = styled.div`
  padding-top: 50px;

  a {
    color: black;
  }
  .storeBox {
    width: 350px;
  }
  .swiper-pagination {
    position: relative;
    top: 7px;
  }
`;

const Title = styled.h1`
  margin-bottom: 40px;
  font-size: 25px;
  font-weight: 500;
  border-bottom: 1px solid gray;
  padding-bottom: 20px;
`;
