import axios from "axios";
import Swal from "sweetalert2";
import { types } from "../types/types";
import { setIsLoading } from "./ui";
import getConfig from "../../helpers/getConfig";

export const startLogin = (accountNumber, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://bankapp-production-57d1.up.railway.app/api/v1/users/login",
        {
          accountNumber,
          password,
        }
      )
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            name: resp.data.user.name,
            accountNumber: resp.data.user.accountNumber,
            amount: resp.data.user.amount,
          })
        );
        Swal.fire({

          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response?.data?.message,
        });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startRegister = (name, password) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .post(
        "https://bankapp-production-57d1.up.railway.app/api/v1/users/signup",
        { name, password }
      )
      .then((resp) => {
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            name: resp.data.user.name,
            accountNumber: resp.data.user.accountNumber,
            amount: resp.data.user.amount,
          })
        );
        Swal.fire({
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Algo salió mal!",
        });
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startChecking = () => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        "https://bankapp-production-57d1.up.railway.app/api/v1/users/renew",
        getConfig()
      )
      .then((resp) => {
        console.log("LEEME! 🙌", resp);
        localStorage.setItem("token", resp.data.token);
        dispatch(
          login({
            id: resp.data.user.uid,
            name: resp.data.user.name,
            accountNumber: resp.data.user.accountNumber,
            amount: resp.data.user.amount,
          })
        );
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({
  type: types.authLogout,
});
