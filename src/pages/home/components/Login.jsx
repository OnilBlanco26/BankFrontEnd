import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { startLogin } from '../../../redux/actions/auth';

const Login = ({className=''}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSelected, setIsSelected] = useState(false)
  
    const { register, handleSubmit, reset } = useForm();
    const { accountNumber } = useSelector((state) => state.auth);
  
    const defaultValues = { accountNumber: "", password: "" };
  
    const submit = (data) => {
      dispatch(startLogin(data.accountNumber, data.password));
      // navigate("/bank/home");
      reset(defaultValues);
    };
  
    const logout = () => {
      dispatch(startLogout());
    };
  return (
    <div className={`${className}`}>
         {accountNumber ? (
        <button className="btn-back" onClick={logout}>
          <i className="fa-solid fa-arrow-right-from-bracket text-green"></i>
        </button>
      ) : (
        <form className="flex flex-col md:flex-row gap-4" onSubmit={handleSubmit(submit)}>
          <input
          className={`rounded-md bg-transparent p-2 placeholder:text-gray-100 placeholder:font-bold text-white ${isSelected ? 'border-double border-4 border-orange' : 'border-2 border-orange'}`}
            type="text"
            placeholder="Numero De Cuenta"
            {...register("accountNumber")}
          />
          <input
          className='rounded-md bg-transparent border-2 border-orange p-2 placeholder:text-gray-100 placeholder:font-bold text-white'
            type="password"
            placeholder="Contraseña"
            {...register("password")}
          />
          <button className='hover:scale-125 transition-all duration-300' type="submit">
            <i className="fa-solid fa-arrow-right bg-green md:bg-transparent py-2 px-6 rounded-md text-white md:text-green text-3xl ml-3"></i>
          </button>
        </form>
      )}
    </div>
  )
}

export default Login