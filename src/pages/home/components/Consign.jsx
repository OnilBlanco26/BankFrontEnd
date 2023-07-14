import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startConsign } from "../../../redux/actions/trasnfer";
import { motion } from "framer-motion";
import prestamoIcon from "../../../assets/prestamoIcon.png"
import creditCard from "../../../assets/creditCard.png"

export const Consign = ({showModal}) => {
  const modalRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(showModal);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const defaultValues = { amount: 0 };

  useEffect(() => {
    const handleClickOutsideModal = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (modalIsOpen) {
      window.addEventListener("mousedown", handleClickOutsideModal);
    }

    return () => {
      window.removeEventListener("mousedown", handleClickOutsideModal);
    };
  }, [modalIsOpen]);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submit = (data) => {
    dispatch(startConsign(data));
    reset(defaultValues);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-2 border-green rounded-md">
        <button
          className="bg-green/50 flex justify-center items-center"
          onClick={openModal}
        >
          <img
            className="w-16 sm:w-24"
            src={prestamoIcon}
            alt="Prestamo"
          />
        </button>
        {modalIsOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            ref={modalRef}
            className="w-[90%] sm:max-w-[60%] md:max-w-[40%] lg:max-w-[30%] ] h-[300px] sm:h-[400px] flex flex-col justify-start items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50  rounded-lg backdrop-blur-md py-14"
            contentLabel="Example Modal"
          >
            <img
              className="w-12 h-12 absolute top-2 right-2"
              src={creditCard}
              alt=""
            />
            <h2 className="text-white font-bold text-2xl sm:text-xl">
              Solicitar Prestamo
            </h2>
            <form
              className="w-full flex justify-center items-center flex-col gap-4 mt-10"
              onSubmit={handleSubmit(submit)}
            >
              <div className="w-[95%] sm:w-[80%] flex flex-col  items-center justify-center">
                <input
                  className="bg-transparent border-4 border-double border-green rounded-md p-2 w-full  placeholder:text-white"
                  placeholder="Ej: 1000"
                  type="number"
                  name="amount"
                  {...register("amount")}
                />
                <span className="text-white text-center font-bold text-md sm:text-xl">
                  Cantidad A Solicitar
                </span>
              </div>
              <div className="w-[40%] sm:w-[20%] rounded-full flex items-center justify-center font-bold uppercase gap-2 bg-green shadow-md md:mt-10 hover:scale-110 transition-all duration-300 active:scale-125">
                <button
                  className="flex items-center justify-center w-full"
                  type="submit"
                >
                  <i className="bx bx-send text-white py-2 text-4xl"></i>
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}

        {/*  */}
      </div>
      <span className="text-xs md:text-md text-center font-bold">Prestamo</span>
    </div>
  );
};
