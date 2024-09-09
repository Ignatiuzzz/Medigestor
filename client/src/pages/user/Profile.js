import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Layout from "./../../components/Layout/Layout";

const Profile = () => {
  // Contexto de autenticación
  const [auth, setAuth] = useAuth();

  // Estado
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Obtener datos del usuario
  useEffect(() => {
    const { email, name, phone, address } = auth?.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  // Validate password
  const validatePassword = (password) => {
    const errors = {
      length: password.length < 6,
      uppercase: !/[A-Z]/.test(password),
      number: !/[0-9]/.test(password),
      specialChar: !/[!@#$%^&*]/.test(password),
    };
    setPasswordErrors(errors);
    return !Object.values(errors).some(Boolean); // Return true if all validations pass
  };

  // Handle password change
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (formSubmitted || newPassword.length > 0) {
      validatePassword(newPassword);
    }
  };

  // Función del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Password validation
    if (password && !validatePassword(password)) {
      return; // Stop submission if password validation fails
    }

    try {
      const { data } = await axios.put("/api/v1/auth/profile", {
        name,
        email,
        password: password ? password : undefined, // Send password only if it's changed
        phone,
        address,
      });

      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Perfil actualizado correctamente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal");
    }
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout title={"Tu Perfil"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8">
            <div className="form-container" style={{ marginTop: "-40px" }}>
              <form onSubmit={handleSubmit}>
                <h4 className="title">PERFIL DE USUARIO</h4>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="exampleInputName"
                    placeholder="Ingresa tu nombre"
                    autoFocus
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail"
                    placeholder="Ingresa tu correo electrónico"
                    disabled
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
                    className="form-control"
                    id="exampleInputPassword"
                    placeholder="Ingresa tu contraseña"
                  />
                  <span
                    onClick={toggleShowPassword}
                    className="position-absolute end-0 me-3"
                    style={{
                      cursor: "pointer",
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  >
                    {showPassword ? "👁️" : "🙈"}
                  </span>
                </div>

                {/* Password Validation Errors */}
                {formSubmitted || password.length > 0 ? (
                  <div className="text-danger">
                    {passwordErrors.length && (
                      <div>Debe tener al menos 6 caracteres.</div>
                    )}
                    {passwordErrors.uppercase && (
                      <div>Debe contener al menos una letra mayúscula.</div>
                    )}
                    {passwordErrors.number && (
                      <div>Debe contener al menos un número.</div>
                    )}
                    {passwordErrors.specialChar && (
                      <div>Debe contener al menos un carácter especial.</div>
                    )}
                  </div>
                ) : null}

                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputPhone"
                    placeholder="Ingresa tu número de teléfono"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="exampleInputAddress"
                    placeholder="Ingresa tu dirección"
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  ACTUALIZAR
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
