import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  const getAdmins = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getUsers/role/0");
      setAdmins(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (adminId) => {
    // Lógica de edición aquí
    console.log("Editando admin con ID:", adminId);
  };

  const handleDelete = async (adminId) => {
    // Confirmación antes de eliminar
    const isConfirmed = window.confirm("¿Estás seguro de querer eliminar este administrador?");
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`/api/v1/user/delete-user/${adminId}`);
      // Actualiza la lista de admins después de la eliminación
      getAdmins(); // Recarga la lista de administradores sin necesidad de recargar toda la página
    } catch (error) {
      console.error("Hubo un error al eliminar el administrador", error);
      alert("No se pudo eliminar el administrador.");
    }
  };

  useEffect(() => {
    getAdmins();
  }, []);

  return (
    <Layout title={"All Admins Data"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Todos los Usuarios</h1>
          {admins?.map((admin, i) => (
            <div className="border shadow mb-4 p-3" key={i}>
              <h2>{admin.name}</h2>
              <p>Email: {admin.email}</p>
              <p>Teléfono: {admin.phone}</p>
              <p>Dirección: {admin.address}</p>
              <p>Respuesta Secreta: {admin.answer}</p>
              <Link to={`/dashboard/admin/edit/${admin._id}`} className="btn btn-primary">Editar</Link>
              <button onClick={() => handleDelete(admin._id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>Eliminar</button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminList;
