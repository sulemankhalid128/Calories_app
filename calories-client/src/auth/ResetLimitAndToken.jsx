import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { ApiService } from "../axios-config";
import Loader from "../common-component/Loader";

const ResetLimitAndToken = ({ match }) => {
  const history = useHistory();
  const location = useLocation();
  const refreshToken = async () => {
    try {
      let res = await ApiService.refreshToken(match?.params?.id);
      localStorage.clear();
      localStorage.setItem("token", res?.token);
      localStorage.setItem("user", JSON.stringify(res));
      toast.success("Token Refresh Successfully!");
      history.push("/");
    } catch (error) {
      console.log("error::", error);
    }
  };
  const resetLimit = async () => {
    try {
      let res = await ApiService.resetLimit(
        match?.params?.id,
        match.params.limit
      );
      localStorage.clear();
      localStorage.setItem("calories_token", res?.token);
      localStorage.setItem("user", JSON.stringify(res));
      toast.success("Threshold Update Successfully!");
      history.push("/");
    } catch (error) {
      console.log("error::", error);
    }
  };
  useEffect(() => {
    let userId = match.params.id;
    let limit = match.params.limit;

    if (userId && !limit) {
      refreshToken();
    }
    if (userId && limit) {
      resetLimit();
    }
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default ResetLimitAndToken;
