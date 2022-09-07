import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import styled from "styled-components";
import LogoImg from "../../assets/images/logo.png";
import api from "../../AxiosConfig";
import {getCookie} from "../../hooks/Cookie";
import {UserInfoType} from "../../types/types";

function Header() {
  return (
    <HeaderBox>
      <Link to="/">
        <LogoBox>
          <img src={LogoImg} />
        </LogoBox>
      </Link>

      <MenuBox>
        <Link to="/store/list">
          <div>점포 목록</div>
        </Link>
        <Link to="/registerstore">
          <div>점포 등록</div>
        </Link>

        <Link to="/signin">
          <div>로그인</div>
        </Link>

        <Link to="/mypage">
          <div>내 정보</div>
        </Link>
      </MenuBox>
    </HeaderBox>
  );
}

export default Header;

const HeaderBox = styled.header`
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  height: 80px !important;
  z-index: 99;
  background-color: white;
  filter: drop-shadow(0px 2px 3px rgba(0, 0, 0, 0.15));
`;
const LogoBox = styled.div`
  img {
    width: 65px;
  }
  :hover {
    transform: scale(1.1);
  }
`;
const MenuBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 500px;
  div {
    color: gray;
    font-weight: 900;
    font-size: 20px;
    &.active {
      color: lightgray;
    }
  }
`;
