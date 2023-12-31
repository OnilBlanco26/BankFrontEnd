import axios from "axios";
import Swal from "sweetalert2";
import getConfig from "../../helpers/getConfig";
import { types } from "../types/types";
import { startChecking, startLogout } from "./auth";
import { setIsLoading } from "./ui";

export const startTransferTo = (amount, accountNumber, senderUserId) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));

    axios
      .post(
        "https://bankapp-production-57d1.up.railway.app/api/v1/transfers",
        {
          amount,
          accountNumber,
          senderUserId,
        },
        getConfig()
      )
      .then((resp) => {
        console.log(resp);
        Swal.fire({
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(startGetHistoryTransfer(senderUserId));
        dispatch(startChecking());
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ha ocurrido un error, por favor contactar con el administrador",
        });
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startGetHistoryTransfer = (id) => {
  return (dispatch) => {
    dispatch(setIsLoading(true));
    axios
      .get(
        `https://bankapp-production-57d1.up.railway.app/api/v1/users/${id}/history`,
        getConfig()
      )
      .then((resp) => {
        console.log(resp);
        dispatch(historyTransfer(resp.data.transfer));
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Se ha producido un error, póngase en contacto con el administrador.",
        });
        console.log(error);
      })
      .finally(() => dispatch(setIsLoading(false)));
  };
};

export const startConsign = (data) => {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const { auth } = getState();
    console.log(auth);
    axios
      .post(
        "https://bankapp-production-57d1.up.railway.app/api/v1/transfers/upload",
        {
          amount: data.amount,
          userId: auth.id,
        },
        getConfig()
      )
      .then((resp) => {
        dispatch(startChecking());
        Swal.fire({
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

export const startDeleteAccount = (data) => {
  return (dispatch, getState) => {
    dispatch(setIsLoading(true));
    const { auth } = getState();
    console.log(auth);
    axios
      .patch(
        `https://bankapp-production-57d1.up.railway.app/api/v1/users/close/account/${auth.id}`,
        {
          accountNumber: data.accountNumber,
          password: data.password,
        },
        getConfig()
      )
      .then((resp) => {
        dispatch(startChecking());
        dispatch(startLogout());
        Swal.fire({
          icon: "success",
          title: resp.data.message,
          showConfirmButton: false,
          timer: 2500,
        });
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
};

const historyTransfer = (history) => ({
  type: types.historyTransfer,
  payload: history,
});
