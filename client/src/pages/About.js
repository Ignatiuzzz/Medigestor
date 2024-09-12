import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - Medigestor"}>
      <div className="row contactus">
        <div className="col-md-6">
          <img
            src="/images/about.jpeg"
            alt="About Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="mt-3">Sobre Nosotros</h2>
          <p className="text-justify mt-4">
            En <strong>Medigestor</strong>, ofrecemos una solución integral para la gestión de consultorios y clínicas en Bolivia. 
            Nuestro objetivo es facilitar el día a día de los médicos y sus pacientes mediante una plataforma intuitiva que permite 
            manejar citas, historiales médicos, documentos y más, todo de forma accesible y en línea.
          </p>
          <h4 className="mt-4">¿Qué Ofrecemos?</h4>
          <ul className="text-justify mt-2">
            <li>Agenda en línea para programar citas por especialidad.</li>
            <li>Reserva de consultorios o salas especializadas para médicos tratantes.</li>
            <li>Gestión de historiales médicos y documentos de pacientes de manera organizada y segura.</li>
            <li>Integración con aseguradoras para mayor comodidad en la consulta médica.</li>
            <li>Emisión y gestión de facturas, recibos y reportes financieros de forma automática.</li>
            <li>Herramientas de marketing automatizadas para campañas vía email, SMS o WhatsApp.</li>
          </ul>
          <h4 className="mt-4">Nuestra Innovación</h4>
          <p className="text-justify mt-2">
            Medigestor ofrece una plataforma basada en la nube que no requiere instalación compleja, 
            permitiendo un acceso rápido y fácil desde cualquier lugar. Nuestra tecnología permite que los médicos y clínicas 
            optimicen su tiempo, mejoren la atención al paciente y automatizan procesos administrativos, todo en un mismo lugar.
          </p>
          <p className="text-justify mt-2">
            Con <strong>Medigestor</strong>, los profesionales de la salud pueden concentrarse en lo que realmente importa: la atención de sus pacientes, 
            mientras nosotros nos encargamos del resto.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;