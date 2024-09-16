import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link, useNavigate } from "react-router-dom";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const navigate = useNavigate();

  const getPayments = async () => {
    try {
      const { data } = await axios.get("/api/v1/payment/get-payments");
      setPayments(data.payments);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (paymentId) => {
    const isConfirmed = window.confirm("¿Estás seguro de querer eliminar este pago?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/v1/payment/delete-payment/${paymentId}`);
      getPayments();
    } catch (error) {
      console.error("Error al eliminar el pago", error);
      alert("No se pudo eliminar el pago.");
    }
  };

  const handleAddPayment = () => {
    navigate("/dashboard/admin/add-payment");
  };

  useEffect(() => {
    getPayments();
  }, []);

  return (
    <Layout title={"Todos los Pagos"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Lista de Pagos Realizados</h1>
          {payments.map((payment, i) => (
            <div className="border shadow mb-4 p-3" key={i}>
              <h2>Pago por: {payment.service}</h2>
              <p>Cliente: {payment.customer.name}</p>
              <p>Monto: ${payment.amount}</p>
              <p>Estado: {payment.status}</p>
              <button onClick={() => handleDelete(payment._id)} className="btn btn-danger">
                Eliminar
              </button>
              <Link to={`/dashboard/admin/edit-payment/${payment._id}`} className="btn btn-primary">
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleAddPayment}
        className="btn btn-primary floating-button"
        style={{ position: "fixed", bottom: "20px", right: "20px", borderRadius: "50%", padding: "20px", fontSize: "24px" }}
      >
        +
      </button>
    </Layout>
  );
};

export default PaymentList;
