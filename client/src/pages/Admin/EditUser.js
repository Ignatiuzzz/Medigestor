import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";

const Profile = () => {
  const { adminId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Asegúrate de manejar esto con cuidado
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(0); // Nuevo estado para manejar el rol del usuario

  useEffect(() => {
    if (adminId) {
      const fetchAdminData = async () => {
        try {
          const { data } = await axios.get(`/api/v1/user/getUser/${adminId}`);
          const { name, email, phone, address, role } = data.user;
          setName(name);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
          setRole(role); // Establecer el rol del usuario obtenido
        } catch (error) {
          console.error("Error al obtener los datos del administrador:", error);
          toast.error("Error al cargar los datos del administrador.");
        }
      };

      fetchAdminData();
    }
  }, [adminId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAdmin = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(address && { address }),
      role, // Incluye el rol en la actualización
    };

    try {
      const { data } = await axios.put(`/api/v1/user/update-user/${adminId}`, updatedAdmin);
      if (data.success) {
        toast.success("Perfil actualizado correctamente");
      } else {
        toast.error(data.message || "Error al actualizar el perfil.");
      }
    } catch (error) {
      console.log("Error al actualizar el perfil:", error);
      toast.error("Error al actualizar el perfil.");
    }
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
                    id="exampleInputEmail1"
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
                    id="exampleInputEmail1"
                    placeholder="Ingresa tu correo electrónico"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Ingresa tu número de teléfono"
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
                  />
                </div>
                
                {/* Añadir selección de rol */}
                <div className="mb-3">
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="0"
                        checked={role === 0}
                        onChange={() => setRole(0)}
                      /> Cliente
                    </label>
                  </div>
                  <div>
                    <label>
                      <input
                        type="radio"
                        value="1"
                        checked={role === 1}
                        onChange={() => setRole(1)}
                      /> Administrador
                    </label>
                  </div>
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
