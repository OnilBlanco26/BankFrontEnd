import React from "react";
import Login from "../../home/components/Login";
import { Banner } from "./Banner";
import bankImage from "../../../assets/bankImage.png"



export const About = () => {
  return (
    <section className="flex flex-col md:flex-row min-h-[80vh] px-10 mt-10 font-poppins">
      <div className="w-full md:w-1/2 order-2 md:order-1 flex flex-col items-center ">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-100 text-center">
          Banking <span className="text-orange ">UI</span>
        </h2>
        <Login className="mt-4 sm:mt-10" />
        <div className="mt-4 flex flex-col justify-center items-center gap-2 text-gray-100">
          <p>
            PixelHub Bank es una pagina que ofrece servicios bancarios
            personalizados y modernos para satisfacer las necesidades
            financieras de sus clientes. Con un diseño elegante y una interfaz
            intuitiva, PixelHub Bank se destaca por brindar una experiencia
            bancaria simple y conveniente.
          </p>
          <p className="hidden sm:block">
            En esta página, los visitantes pueden explorar una amplia gama de
            servicios, que incluyen cuentas bancarias, préstamos, inversiones y
            tarjetas de crédito. Además, PixelHub Bank ofrece herramientas y
            recursos útiles para ayudar a los clientes a administrar su dinero
            de manera eficiente.
          </p>
          <p className="hidden md:block">
            Con un enfoque en la seguridad y la privacidad, PixelHub Bank
            garantiza la protección de los datos sensibles de sus clientes a
            través de medidas de seguridad avanzadas y protocolos de
            encriptación.
          </p>
          <p className="hidden md:block">
            La página también destaca la atención al cliente de alta calidad que
            ofrece PixelHub Bank. Los visitantes pueden encontrar fácilmente
            información de contacto y acceder a un equipo de servicio al cliente
            amigable y experto que está disponible para responder preguntas y
            brindar asistencia.
          </p>

          <Banner />
        </div>
      </div>
      <div className="flex justify-center items-center w-full order-1 md:order-2 md:w-1/2 ">
        <img
          className="w-full relative -top-10 sm:w-[60%] md:w-full"
          src={bankImage}
          alt=""
        />
      </div>
    </section>
  );
};
