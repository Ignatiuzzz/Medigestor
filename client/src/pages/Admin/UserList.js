import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Link } from 'react-router-dom';

const AdminList = () => {
  const [admins, setAdmins] = useState([]);

  // Obtener los administradores al cargar el componente
  const getAdmins = async () => {
    try {
      const { data } = await axios.get("/api/v1/user/getUsers/role/0");
      setAdmins(data.users);
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el cambio de plan del usuario
  const handlePlanChange = async (adminId, newPlan) => {
    try {
      // Llamada al backend para actualizar el plan del usuario
      await axios.put(`/api/v1/user/update-plan/${adminId}`, { plan: newPlan });
      alert("Plan actualizado correctamente");
      getAdmins(); // Recargar la lista de admins para reflejar los cambios
    } catch (error) {
      console.error("Error al actualizar el plan", error);
      alert("No se pudo actualizar el plan");
    }
  };

  // Confirmación antes de eliminar
  const handleDelete = async (adminId) => {
    const isConfirmed = window.confirm("¿Estás seguro de querer eliminar este administrador?");
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`/api/v1/user/delete-user/${adminId}`);
      getAdmins(); // Recargar la lista de administradores
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

              {/* ComboBox para seleccionar el plan */}
              <label htmlFor={`plan-select-${admin._id}`}>Plan:</label>
              <select
                id={`plan-select-${admin._id}`}
                value={admin.plan} // Mostrar el plan actual
                onChange={(e) => handlePlanChange(admin._id, parseInt(e.target.value))}
                className="form-control"
                style={{ width: "200px", display: "inline-block", marginRight: "10px" }}
              >
                <option value={0}>Plan Médico</option>
                <option value={1}>Plan Clínica</option>
                <option value={2}>Plan Hospital</option>
              </select>

              <Link to={`/dashboard/admin/edit/${admin._id}`} className="btn btn-primary">
                Editar
              </Link>
              <button onClick={() => handleDelete(admin._id)} className="btn btn-danger" style={{ marginLeft: "10px" }}>
                Eliminar
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default AdminList;
