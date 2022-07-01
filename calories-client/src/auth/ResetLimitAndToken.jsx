import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../axios-config";
import Loader from "../common-component/Loader";
import { setUserLocal } from "../utils/statics";

const ResetLimitAndToken = ({ match }) => {
  const history = useHistory();

  // this method is used for the refresh user token by giving the user id
  const refreshToken = async () => {
    try {
      let res = await ApiService.refreshToken(match?.params?.id);
      setUserLocal(res);
      toast.success("Token Refresh Successfully!");
      history.push("/");
    } catch (error) {
      console.log("error::", error);
    }
  };
  // this method is used for the reset user threshold limit by giving the user id and limit
  const resetLimit = async () => {
    try {
      let res = await ApiService.resetLimit(
        match?.params?.id,
        match.params.limit
      );
      setUserLocal(res);
      toast.success("Threshold Update Successfully!");
      history.push("/");
    } catch (error) {
      console.log("error::", error);
    }
  };

  //this method is used for the get user by name
  const getUserByName = async () => {
    try {
      let res = await ApiService.getUserByName(match?.params?.name);
      setUserLocal(res);
      history.push("/");
    } catch (error) {
      console.log("error::", error);
    }
  };

  useEffect(() => {
    let userId = match.params.id;
    let limit = match.params.limit;
    let username = match.params.name;

    if (userId && !limit) {
      refreshToken();
    }
    if (userId && limit) {
      resetLimit();
    }
    if (username) {
      getUserByName();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Loader />
    </div>
  );
};

export default ResetLimitAndToken;
