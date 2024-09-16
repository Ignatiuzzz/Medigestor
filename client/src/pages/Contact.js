import React from "react";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import Layout from "./../components/Layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contáctanos - Medigestor"}>
      <div className="container" >
        <div className="row contactus">
          <div className="col-md-6">
            <img
              src="/images/contactus.jpeg"
              alt="Contáctanos"
              style={{ width: "100%", borderRadius: '8px' }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="bg-dark p-3 text-white text-center rounded">¡Estamos aquí para ayudarte!</h2>
            <p className="mt-4 text-justify">
              Si tienes alguna consulta o necesitas soporte técnico relacionado con el uso de Medigestor, no dudes en ponerte en contacto con nosotros. 
              Nuestro equipo está disponible para ayudarte a gestionar tus citas, historiales médicos, facturación, y cualquier otro aspecto de nuestro servicio.
            </p>
            <div className="contact-info mt-4">
              <h4>Información de Contacto</h4>
              <p className="mt-3">
                <BiMailSend /> <strong>Email:</strong> soporte@medigestor.com
              </p>
              <p className="mt-3">
                <BiPhoneCall /> <strong>Teléfono:</strong> 555-24257872
              </p>
              <p className="mt-3">
                <BiSupport /> <strong>Soporte Técnico:</strong> 1800-1111-0000
              </p>
            </div>
            <div className="mt-4">
              <h4>Formulario de Contacto</h4>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Tu Nombre" required />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" placeholder="Tu Correo Electrónico" required />
                </div>
                <div className="mb-3">
                  <textarea className="form-control" rows="4" placeholder="Tu Mensaje o Solicitud de Soporte" required></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Enviar</button>
              </form>
            </div>
            <div className="mt-4">
              <h4>Nuestra Ubicación</h4>
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.0683820769614!2d-68.1145661240965!3d-16.52264504131031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915f20ee187a3103%3A0x2f2bb2b7df32a24d!2sUniversidad%20Cat%C3%B3lica%20Boliviana%20%22San%20Pablo%22!5e0!3m2!1ses!2sbo!4v1724615932027!5m2!1ses!2sbo"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
            </div>
            <div className="mt-4">
              <h4>Horarios de Atención</h4>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
              <p>Sábado: 10:00 AM - 2:00 PM</p>
              <p>Domingo: Cerrado</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;