import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {signer} from "../../abi/modules/ethers";
import api from "../../AxiosConfig";
import {removeCookie} from "../../hooks/Cookie";
import {UserInfoType} from "../../types/types";

export default function (Component: any) {
  function Auth() {
    const [UserInfo, setUserInfo] = useState<UserInfoType[]>([]);

    const navi = useNavigate();

    useEffect(() => {
      auth();
    }, []);

    const auth = async () => {
      try {
        const check = await api.post("/user/auth", {});
        const address = await signer.getAddress();

        if (check.data.eoa.toLowerCase() !== address.toLowerCase()) {
          removeCookie("blockReview");
          alert("로그인이 필요합니다.");
          navi("/signin");
        }
        setUserInfo([check.data]);
      } catch (error) {
        removeCookie("blockReview");
        alert("로그인이 필요합니다.");
        navi("/signin");
      }
    };

    return <Component UserInfo={UserInfo} />;
  }
  return Auth;
}
