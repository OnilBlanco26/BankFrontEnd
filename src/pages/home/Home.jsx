import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGetHistoryTransfer } from "../../redux/actions/trasnfer";
import { Consign } from "./components/Consign";
import { DeleteAccount } from "./components/DeleteAccount";
import { HistoryTransfer } from "./components/HistoryTransfer";
import { Transfer } from "./components/Transfer";
import { startLogout } from "../../redux/actions/auth";
import bgCard from "../../assets/bgCard.jpg";
import logoMastercard from "../../assets/logo-Mastercard.png"

export const Home = () => {
  const dispatch = useDispatch();

  const [isActive, setIsActive] = useState("transfer");
  const [time, setTime] = useState("");

  const { accountNumber, amount, name, createdAt } = useSelector(
    (state) => state.auth
  );
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startGetHistoryTransfer(id));
  }, [dispatch, id]);

  setTimeout(() => {
    setTime(moment().format("MMMM Do YYYY, h:mm:ss a"));
  }, 1000);

  const logout = () => {
    dispatch(startLogout());
  };

  const handleIsActive = (e, value) => {
    e.preventDefault();
    setIsActive(value);
  };

  return (
    <div className="m-8 text-white font-poppins">
      <section className="flex items-center justify-center ">
        <div
          className="bg-cover bg-no-repeat bg-center w-[80%] h-[500px] rounded-md shadow-sm flex flex-col gap-8 p-3 items-center justify-center justify-items-center relative"
          style={{ backgroundImage: `url(${bgCard})` }}
        >
          <h5 className="w-1/2 top-2 left-2 text-3xl text-center font-bold text-white relative mb-2">
            {time}
          </h5>
          <div className="flex flex-row justify-center items-centerz w-full h-full gap-8">
            <div className="flex flex-col justify-center items-center">
              <div className="w-96 h-[220px] bg-black/80 rounded-lg backdrop-blur-md flex flex-col shadow-md">
                <h2 className="text-2xl font-semibold relative top-5 left-5 text-relieve">
                  PixelHub Bank
                </h2>
                <div className="flex absolute top-20 w-full">
                  <div className="bg-white h-[1px] w-1/2"></div>
                  <div className="bg-white h-[1px] w-[20%] -rotate-[35deg] origin-left"></div>
                </div>
                <img
                  className="absolute top-6 right-4 w-12"
                  src={logoMastercard}
                  alt=""
                />
                <div className="relative top-28 left-4">
                  <h4 className="text-md text-relieve w-[75%]">
                    {" "}
                    {accountNumber.match(/.{1,4}/g)?.join(" ")}
                  </h4>
                  <h4 className="text-md font-normal">{name}</h4>
                </div>
                <i className="absolute bottom-4 right-6 fa-solid fa-building-columns text-4xl text-white text-relieve"></i>
              </div>

              <div className="flex flex-row gap-2 mt-4">
                <Transfer />
                <Consign />
                <DeleteAccount />
              </div>
            </div>

            <div className="w-[50%] h-[90%] bg-white/20 backdrop-blur-sm mt-2 shadow-md rounded flex flex-col items-center relative">
              <h2 className="text-white font-bold text-3xl mt-2">
                Informacion Personal
              </h2>

              <div className="px-2 mt-2 w-full flex justify-between items-center">
                <h3 className="text-white font-bold text-2xl">
                  Fecha de Creacion:
                </h3>
                <h3 className="text-green font-bold text-md border-dotted border-2 border-green p-1 shadow-sm shadow-gray-100">
                  {createdAt}
                </h3>
              </div>

              <div className="px-2 mt-2 w-full flex justify-between items-center">
                <h3 className="text-white font-bold text-2xl">
                  Saldo Disponible:
                </h3>
                <h3 className="text-green text-md border-dotted border-2 border-green p-1 shadow-sm shadow-gray-100">
                  {amount} $USD
                </h3>
              </div>
            </div>
          </div>
        </div>

        <button className="absolute top-10 right-11" onClick={logout}>
          <i className="fa-solid fa-arrow-right-from-bracket text-red text-4xl"></i>
        </button>
      </section>

      <div className="w-[80%] mx-auto mt-10 flex flex-col justify-center items-center">
        <nav className="w-[40%] mt-1 flex justify-around align-middle border border-orange rounded-lg mb-10">
          <button
            onClick={(e) => handleIsActive(e, "transfer")}
            className={`${
              isActive === "transfer"
                ? "bg-orange text-gray-300"
                : "bg-gray-200 text-gray-100 hover:text-orange active:bg-orange active:text-gray-300"
            }  w-full text-base text-center font-nunito m-2.5   border-0 cursor-pointer rounded capitalize font-semibold`}
          >
            Transferido
          </button>
          {/* <button onClick={(e) => handleIsActive(e,'received')} className={`${isActive === 'received' ? 'bg-orange text-gray-300' : 'bg-gray-200 text-gray-100 hover:text-orange active:bg-orange active:text-gray-300'}  w-full text-base text-center font-nunito m-2.5   border-0 cursor-pointer rounded capitalize font-semibold`}>
              Recibido
            </button> */}
        </nav>
        {isActive === "transfer" ? <HistoryTransfer /> : <p>Vacio</p>}
      </div>
    </div>
  );
};
