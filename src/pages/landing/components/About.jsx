import React from "react";
import imgMoney from "../../../../public/assets/money.jpg";
import imgBuild from "../../../../public/assets/build.jpg";
import Login from "../../home/components/Login";
import { Banner } from "./Banner";

export const About = () => {
  return (
    <section className="flex min-h-[80vh] px-10 mt-10 font-poppins">
      <div className="w-1/2 flex flex-col items-center ">
        <h2 className="text-5xl font-bold text-gray-100">
          Banking <span className="text-orange">UI</span>
        </h2>
        <Login className="mt-10" />
        <div className="mt-4 flex flex-col gap-2 text-gray-100">
          <p>
            PixelHub Bank es una pagina que ofrece servicios bancarios
            personalizados y modernos para satisfacer las necesidades
            financieras de sus clientes. Con un diseño elegante y una interfaz
            intuitiva, PixelHub Bank se destaca por brindar una experiencia
            bancaria simple y conveniente.
          </p>
          <p>
            En esta página, los visitantes pueden explorar una amplia gama de
            servicios, que incluyen cuentas bancarias, préstamos, inversiones y
            tarjetas de crédito. Además, PixelHub Bank ofrece herramientas y
            recursos útiles para ayudar a los clientes a administrar su dinero
            de manera eficiente.
          </p>
          <p>
            Con un enfoque en la seguridad y la privacidad, PixelHub Bank
            garantiza la protección de los datos sensibles de sus clientes a
            través de medidas de seguridad avanzadas y protocolos de
            encriptación.
          </p>
          <p>
            La página también destaca la atención al cliente de alta calidad que
            ofrece PixelHub Bank. Los visitantes pueden encontrar fácilmente
            información de contacto y acceder a un equipo de servicio al cliente
            amigable y experto que está disponible para responder preguntas y
            brindar asistencia.
          </p>

          <Banner />
        </div>
      </div>
      <div className="w-1/2">
        <img
          className="w-full relative -top-10"
          src="../../../../public/assets/bankImage.png"
          alt=""
        />
      </div>
    </section>
  );
};
