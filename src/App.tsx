import React from "react";
import {Route, Routes} from "react-router-dom";
import "./assets/css/normalize.scss";
import "./assets/css/global.scss";
import Landing from "./components/Landing/Landing";
import Header from "./components/layouts/Header";
import My from "./components/Mypage/MyPage";
import ReviewDetail from "./components/ReviewDetail/ReviewDetail";
import ReviewWrite from "./components/ReviewWrite/ReviewWrite";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import StoreDetail from "./components/StoreDetail/StoreDetail";
import StoreList from "./components/StoreList/StoreList";
import RegisterStore from "./components/RegisterStore/RegisterStore";
import MyReview from "./components/Mypage/sections/MyReview";
import Auth from "./components/Hoc/Auth";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const StoreDetailPage = Auth(StoreDetail);
  const ReviewDetailPage = Auth(ReviewDetail);
  const ReviewWritePage = Auth(ReviewWrite);
  const StoreRegisterPage = Auth(RegisterStore);
  const MyReviewPage = Auth(MyReview);
  const MyPage = Auth(My);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/store/list" element={<StoreList />} />
        <Route path="/store/:id" element={<StoreDetailPage />} />
        <Route path="/review/:id" element={<ReviewDetailPage />} />
        <Route path="/review/write/:id" element={<ReviewWritePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/registerstore" element={<StoreRegisterPage />} />
        <Route path="/myreview/:id" element={<MyReviewPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
