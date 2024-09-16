import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    appointmentDate: "",
    appointmentTime: "",
    status: "",
  });

  // Obtener todas las citas
  const fetchAppointments = async () => {
    try {
      // Obtener todas las citas sin filtros
      const { data } = await axios.get("/api/v1/appointment/all-appointments");
      if (data?.success) {
        setAppointments(data.appointments);
      } else {
        toast.error("Error al obtener las citas");
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
      toast.error("Algo salió mal al obtener las citas");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Manejar el cambio en el formulario de edición
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la edición de una cita
  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
    setFormData({
      doctor: `${appointment.doctor?.name} ${appointment.doctor?.lastName}`,
      specialty: appointment.specialty?.name,
      appointmentDate: appointment.appointmentDate,
      appointmentTime: appointment.appointmentTime,
      status: appointment.status,
    });
  };

  // Enviar la actualización de la cita
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(`/api/v1/appointment/update-appointment/${editingAppointment._id}`, formData);
      if (data?.success) {
        toast.success("Cita actualizada con éxito");
        setEditingAppointment(null); // Salir del modo de edición
        fetchAppointments(); // Recargar las citas
      } else {
        toast.error("Error al actualizar la cita");
      }
    } catch (error) {
      console.error("Error updating appointment", error);
      toast.error("Algo salió mal al actualizar la cita");
    }
  };

  // Manejar la eliminación de una cita
  const handleDelete = async (id) => {
    try {
      const confirm = window.confirm("¿Estás seguro de que deseas eliminar esta cita?");
      if (!confirm) return;
      const { data } = await axios.delete(`/api/v1/appointment/delete-appointment-simple/${id}`);
      if (data?.success) {
        toast.success("Cita eliminada con éxito");
        fetchAppointments(); // Recargar las citas después de eliminar
      } else {
        toast.error("Error al eliminar la cita");
      }
    } catch (error) {
      console.error("Error deleting appointment", error);
      toast.error("Algo salió mal al eliminar la cita");
    }
  };

  return (
    <Layout title="Administrar Citas">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4 className="mb-4">Todas las Citas</h4>
            {appointments.length === 0 ? (
              <p>No hay citas disponibles.</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Especialidad</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                      <th>Usuario</th> {/* Columna para el usuario */}
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr key={appointment._id}>
                        <td>{`${appointment.doctor?.name} ${appointment.doctor?.lastName}`}</td>
                        <td>{appointment.specialty?.name}</td>
                        <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                        <td>{appointment.appointmentTime}</td>
                        <td>{appointment.status}</td>
                        <td>{appointment.user ? `${appointment.user.name} (${appointment.user.email})` : "N/A"}</td> {/* Mostrar usuario */}
                        <td>
                          <button className="btn btn-primary me-2" onClick={() => handleEdit(appointment)}>
                            Editar
                          </button>
                          <button className="btn btn-danger" onClick={() => handleDelete(appointment._id)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Formulario de edición */}
            {editingAppointment && (
              <div className="edit-form mt-4">
                <h4>Editar Cita</h4>
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label>Doctor</label>
                    <input
                      type="text"
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label>Especialidad</label>
                    <input
                      type="text"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="form-control"
                      readOnly
                    />
                  </div>
                  <div className="mb-3">
                    <label>Fecha de la Cita</label>
                    <input
                      type="date"
                      name="appointmentDate"
                      value={new Date(formData.appointmentDate).toISOString().split("T")[0]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Hora de la Cita</label>
                    <input
                      type="time"
                      name="appointmentTime"
                      value={formData.appointmentTime}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                  <div className="mb-3">
                    <label>Estado</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="Scheduled">Programada</option>
                      <option value="Completed">Completada</option>
                      <option value="Cancelled">Cancelada</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-success">Actualizar</button>
                  <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditingAppointment(null)}>
                    Cancelar
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAppointments;
