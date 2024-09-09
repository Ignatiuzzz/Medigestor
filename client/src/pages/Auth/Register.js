import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css";
import Layout from "./../../components/Layout/Layout";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Password validation functions
  const validateLength = (password) => password.length >= 6;
  const validateUppercase = (password) => /[A-Z]/.test(password);
  const validateNumber = (password) => /\d/.test(password);
  const validateSpecialChar = (password) => /[@$!%*?&]/.test(password);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Check each requirement separately
    setPasswordErrors({
      length: !validateLength(newPassword),
      uppercase: !validateUppercase(newPassword),
      number: !validateNumber(newPassword),
      specialChar: !validateSpecialChar(newPassword),
    });
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the password meets all requirements before submitting
    if (Object.values(passwordErrors).some((error) => error)) {
      toast.error("Password does not meet the requirements.");
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal");
    }
  };

  const formContainerStyle = {
    width: "400px", // Fixed width
    maxWidth: "90%", // Responsive on smaller screens
    margin: "auto",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    minHeight: "90vh",
  };

  return (
    <Layout title="Registro - Medigestor">
      <div className="form-container" style={formContainerStyle}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">FORMULARIO DE REGISTRO</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Ingresa tu nombre"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Ingresa tu correo electrónico"
              required
            />
          </div>
          <div className="mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Ingresa tu contraseña"
              required
            />
            <span
              onClick={toggleShowPassword}
              className="position-absolute end-0 me-3"
              style={{ cursor: "pointer", top: "50%", transform: "translateY(-50%)" }}
            >
              {showPassword ? "👁️" : "🙈"}
            </span>
            <div className="text-danger">
              {passwordErrors.length && <div>Debe tener al menos 6 caracteres.</div>}
              {passwordErrors.uppercase && <div>Debe contener al menos una letra mayúscula.</div>}
              {passwordErrors.number && <div>Debe contener al menos un número.</div>}
              {passwordErrors.specialChar && <div>Debe contener al menos un carácter especial.</div>}
            </div>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Ingresa tu teléfono"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Ingresa tu dirección"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="¿Cuál es tu Libro favorito?"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={Object.values(passwordErrors).some((error) => error)}>
            REGISTRAR
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
