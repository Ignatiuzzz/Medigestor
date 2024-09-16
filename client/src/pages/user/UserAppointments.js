import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const UserAppointments = () => {
  const [auth] = useAuth();
  const [appointments, setAppointments] = useState([]);

  // Obtener las citas del usuario autenticado
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/appointment/my-appointments");
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

  return (
    <Layout title="Mis Citas">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h4 className="mb-4">Mis Citas</h4>
            {appointments.length === 0 ? (
              <p>No tienes citas programadas.</p>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAppointments;
