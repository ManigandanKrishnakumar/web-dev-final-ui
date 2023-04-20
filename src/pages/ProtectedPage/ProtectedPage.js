import React, { useContext } from 'react';
import { PageHeading } from "../../components";
import "./ProtectedPage.css";
import UserInfo from '../../components/UpdateUserInfo/UpdateUserInfo';
import { useNavigate } from 'react-router-dom';
import {useEffect} from 'react';

import { AppContext } from "../../state-management/app-context";
import {STATES } from "../../state-management/constants";

export const ProtectedPage = () => {
  const navigate = useNavigate();
  const {data} = useContext(AppContext);

  useEffect(() => {

  if (data[STATES.IS_LOGGED_IN] !== true ) {
    navigate('/');
  }
}, []);
  return  (
    <>
    <PageHeading heading="Update User Info" />
    <UserInfo/>
    </>
  );
};
