import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AddInvoice = () => {
  const { appointmentId } = useParams();  // Obtener el ID de la cita desde los parámetros de la URL
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [paymentId, setPaymentId] = useState("");
  const [status, setStatus] = useState("emitida");
  const [issueDate, setIssueDate] = useState("");  // Nuevo campo para la fecha de emisión
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");  // Obtener el ID del usuario logueado
  const appointment = localStorage.getItem("appointment");  // Obtener el ID del usuario logueado

  // Obtener el pago asociado a la cita
  const getPaymentByAppointment = async () => {
    try {
      setPaymentId(appointment);  // Establecer el ID del pago en el estado
    } catch (error) {
      console.error("Error al obtener el pago asociado:", error);
    }
  };

  useEffect(() => {
    getPaymentByAppointment();  // Obtener el pago asociado al cargar el componente
  }, [appointmentId]);

  // Crear la factura y generar el PDF
  const handleCreateInvoice = async () => {
    try {
      // Verificar si el paymentId se ha establecido correctamente
      if (!paymentId) {
        alert("No se encontró un pago asociado. No se puede crear la factura.");
        return;
      }

      const invoiceData = {
        invoiceNumber,
        payment: paymentId,  // Asegúrate de que el paymentId se envíe correctamente
        totalAmount,
        customer: userId,  // Asegúrate de agregar el cliente correcto
        status,
        issueDate,  // Agregar la fecha de emisión
      };

      // Verificación de los datos antes de enviar la solicitud
      console.log("Datos de la factura a enviar:", invoiceData);

      await axios.post("/api/v1/invoice/create-invoice", invoiceData);
      navigate("/dashboard/admin/paymentList");
    } catch (error) {
      console.error("Error al crear la factura", error);
      alert("No se pudo crear la factura.");
    }
  };

  return (
    <Layout title={"Agregar Nueva Factura"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Registrar Factura</h1>
          <div className="mb-3">
            <label htmlFor="invoiceNumber">Número de Factura:</label>
            <input
              id="invoiceNumber"
              type="text"
              className="form-control"
              value={invoiceNumber}
              onChange={(e) => setInvoiceNumber(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="totalAmount">Monto Total:</label>
            <input
              id="totalAmount"
              type="number"
              className="form-control"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>

          {/* Campo de entrada para la fecha de emisión */}
          <div className="mb-3">
            <label htmlFor="issueDate">Fecha de Emisión:</label>
            <input
              id="issueDate"
              type="date"  // Usamos el tipo 'date' para obtener un selector de fecha
              className="form-control"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}  // Actualiza el estado
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status">Estado de la Factura:</label>
            <select
              id="status"
              className="form-control"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="emitida">Emitida</option>
              <option value="pagada">Pagada</option>
              <option value="vencida">Vencida</option>
              <option value="cancelada">Cancelada</option>
            </select>
          </div>
          <button onClick={handleCreateInvoice} className="btn btn-success">
            Registrar Factura
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddInvoice;
