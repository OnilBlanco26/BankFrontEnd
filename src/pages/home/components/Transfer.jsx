import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { startTransferTo } from "../../../redux/actions/trasnfer";
import { motion } from "framer-motion";
import transferIcon from "../../../assets/transferIcon.png"
import creditCard from "../../../assets/creditCard.png"

export const Transfer = () => {
  const modalRef = useRef(null);
  const [modalIsOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  const defaultValues = { accountNumber: "", amount: 0 };

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
    dispatch(startTransferTo(+data.amount, +data.accountNumber, id));
    reset(defaultValues);
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-2 border-orange rounded-md">
        <button
          className="bg-orange/50 flex justify-center items-center"
          onClick={openModal}
        >
          <img
            className="w-24"
            src={transferIcon}
            alt="Transfer"
          />
        </button>

        {modalIsOpen ? (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            ref={modalRef}
            className="min-w-[40vw] h-[400px] flex flex-col justify-start items-center z-30 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/50  rounded-lg backdrop-blur-md py-14"
            contentLabel="Example Modal"
          >
            <img
              className="w-12 h-12 absolute top-2 right-2"
              src={creditCard}
              alt=""
            />
            <h2 className="text-white font-bold mb-2 text-xl">
              Informacion Bancaria
            </h2>
            <form
              className="w-full flex justify-center items-center flex-col gap-4 mt-10"
              onSubmit={handleSubmit(submit)}
            >
              <div className="w-[80%] flex items-center justify-between">
                <input
                  className="bg-transparent border-4 border-double border-orange rounded-md p-2 w-1/2 placeholder:text-white"
                  placeholder="Ej: 21902023192023652"
                  type="text"
                  {...register("accountNumber")}
                />
                <span className="text-white font-bold text-2xl">
                  Cuenta Destinatario
                </span>
              </div>
              <div className="w-[80%] flex items-center justify-between">
                <input
                  className="bg-transparent border-4 border-double border-orange rounded-md p-2 w-1/2 placeholder:text-white"
                  placeholder="Ej: 500"
                  type="number"
                  {...register("amount")}
                />
                <span className="text-white font-bold text-2xl">Cantidad</span>
              </div>
              <div className="w-[20%] rounded-full flex items-center justify-center font-bold uppercase gap-2 bg-orange shadow-md mt-10 hover:scale-110 transition-all duration-300 active:scale-125">
                <button
                  className="flex items-center justify-center w-full "
                  type="submit"
                >
                  <i className="bx bx-send text-white py-2 text-4xl"></i>
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
        {/* */}
      </div>
      <span className="text-center font-bold">Transferir</span>
    </div>
  );
};
