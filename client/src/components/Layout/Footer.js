import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <h1 className="text-center">Derechos reservados </h1>
      <p className="text-center mt-3">
        <Link to="/about">Sobre nosotros</Link>|<Link to="/contact">Contactanos</Link>|
        <Link to="/policy">Politica de privacidad</Link>
      </p>
    </div>
  );
};

export default Footer;
