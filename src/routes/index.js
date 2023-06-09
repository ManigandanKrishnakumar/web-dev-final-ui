import { Route, Routes } from "react-router-dom";
import { URLS } from "../constants/navConstants";
import {
  AdminDashboard,
  Home,
  ProtectedPage,
  RequestsPage,
  SignIn,
  TestFunctionality,
  UserProfile,
} from "../pages";
import { SignUp } from "../pages/SignUp/SignUp";
import { PublicUserInfo } from "../pages/PublicUserInfo/PublicUserInfo";

export const RouterOutlet = () => {
  return (
    <Routes>
      <Route path={URLS.default} element={<Home />} />
      <Route path={URLS.home} element={<Home />} />
      <Route path={URLS.adminDashboard} element={<AdminDashboard />} />
      <Route path={URLS.signIn} element={<SignIn />} />
      <Route path={URLS.signUp} element={<SignUp />} />
      <Route path={URLS.userInfo} element={<ProtectedPage />} />
      <Route path={URLS.requests} element={<RequestsPage />}></Route>
      <Route path="/test-functionality" element={<TestFunctionality />} />
      <Route path={URLS.Userdetails} element={<UserProfile />} />
      <Route path="/user/:username" element={<PublicUserInfo />} />
    </Routes>
  );
};
