import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AddPayment = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [status, setStatus] = useState("pendiente");
  const [notes, setNotes] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [issuers, setIssuers] = useState([]);
  const [selectedIssuer, setSelectedIssuer] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const navigate = useNavigate();

  // Obtener el ID del usuario logueado desde localStorage o contexto global
  const userId = localStorage.getItem("userId");

  // Depuración: Verificar si el userId está en localStorage
  console.log("ID del usuario logueado desde localStorage:", userId);

  // Obtener todas las citas que no tienen un pago registrado
  const getAppointmentsWithoutPayment = async () => {
    try {
      const { data } = await axios.get("/api/v1/appointment/get-appointments");
      console.log("Appointments data:", data); // Depuración de datos de citas
      setAppointments(data.appointments);
    } catch (error) {
      console.error("Error al obtener las citas sin pago", error);
    }
  };

  // Obtener aseguradoras o clínicas
  const getIssuers = async () => {
    try {
      const { data } = await axios.get("/api/v1/issuer/get-issuers");
      console.log("Issuers data:", data); // Depuración de datos de aseguradoras
      setIssuers(data.insurers); // Corregido: ahora se accede a 'insurers' en lugar de 'issuers'
    } catch (error) {
      console.error("Error al obtener las aseguradoras o clínicas", error);
    }
  };

  // Manejar la selección de una cita
  const handleSelectAppointment = (e) => {
    const appointmentId = e.target.value;
    setSelectedAppointment(appointmentId);

    // Usa el ID del usuario logueado directamente en lugar de obtenerlo desde la cita
    setSelectedCustomer(userId); // Asignamos el ID del usuario logueado como cliente
  };

  // Manejar la selección del emisor (aseguradora o clínica)
  const handleSelectIssuer = (e) => {
    const issuerId = e.target.value;
    setSelectedIssuer(issuerId);
  };

  // Registrar el pago
  const handleCreatePayment = async () => {
    try {
      const paymentData = {
        issuer: selectedIssuer,
        customer: selectedCustomer, // Usamos el ID del usuario logueado como cliente
        appointment: selectedAppointment,
        service: "Servicio médico", // Puedes cambiarlo según sea necesario
        amount,
        paymentMethod,
        status,
        dueDate,
        notes,
      };
      localStorage.setItem("appointment", selectedAppointment);  // Añadir esta línea

      // Verificar que customer no esté en null
      console.log("Datos del pago a enviar:", paymentData);

      if (!selectedCustomer) {
        alert("No se ha encontrado el ID del cliente.");
        return;
      }

      await axios.post("/api/v1/payment/create-payment", paymentData);
      navigate(`/dashboard/admin/addInvoice/${selectedAppointment}`);
    } catch (error) {
      console.error("Error al registrar el pago", error);
      alert("No se pudo registrar el pago.");
    }
  };

  useEffect(() => {
    getAppointmentsWithoutPayment();
    getIssuers(); // Obtener aseguradoras o clínicas
  }, []);

  return (
    <Layout title={"Agregar Nuevo Pago"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Agregar Pago</h1>

          {/* Seleccionar Emisor */}
          <div className="mb-3">
            <label htmlFor="issuer">Seleccionar Aseguradora/Clínica:</label>
            <select id="issuer" className="form-control" onChange={handleSelectIssuer}>
              <option value="">Seleccionar aseguradora o clínica</option>
              {issuers?.map((issuer, i) => (
                <option key={i} value={issuer._id}>
                  {issuer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Seleccionar Cita */}
          <div className="mb-3">
            <label htmlFor="appointment">Seleccionar Cita:</label>
            <select id="appointment" className="form-control" onChange={handleSelectAppointment}>
              <option value="">Seleccionar una cita</option>
              {appointments?.map((appointment, i) => (
                <option key={i} value={appointment._id}>
                  {appointment.patientName} - {new Date(appointment.appointmentDate).toLocaleDateString()}
                </option>
              ))}
            </select>
          </div>

          {/* Monto */}
          <div className="mb-3">
            <label htmlFor="amount">Monto:</label>
            <input
              id="amount"
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Método de Pago */}
          <div className="mb-3">
            <label htmlFor="paymentMethod">Método de Pago:</label>
            <select
              id="paymentMethod"
              className="form-control"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="">Seleccionar Método</option>
              <option value="tarjeta">Tarjeta</option>
              <option value="transferencia">Transferencia</option>
              <option value="efectivo">Efectivo</option>
            </select>
          </div>

          {/* Estado del Pago */}
          <div className="mb-3">
            <label htmlFor="status">Estado del Pago:</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pendiente">Pendiente</option>
              <option value="pagado">Pagado</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          {/* Fecha de Vencimiento */}
          <div className="mb-3">
            <label htmlFor="dueDate">Fecha de Vencimiento:</label>
            <input
              id="dueDate"
              type="date"
              className="form-control"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>

          {/* Notas */}
          <div className="mb-3">
            <label htmlFor="notes">Notas:</label>
            <textarea
              id="notes"
              className="form-control"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          {/* Botón para registrar el pago */}
          <button onClick={handleCreatePayment} className="btn btn-success">
            Registrar Pago
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddPayment;
