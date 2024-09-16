import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { Link, useNavigate } from "react-router-dom";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  const getInvoices = async () => {
    try {
      const { data } = await axios.get("/api/v1/invoice/get-invoices");
      setInvoices(data.invoices);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (invoiceId) => {
    const isConfirmed = window.confirm("¿Estás seguro de querer eliminar esta factura?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/v1/invoice/delete-invoice/${invoiceId}`);
      getInvoices();
    } catch (error) {
      console.error("Error al eliminar la factura", error);
      alert("No se pudo eliminar la factura.");
    }
  };

  const handleAddInvoice = () => {
    navigate("/dashboard/admin/add-invoice");
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <Layout title={"Lista de Facturas"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Lista de Facturas</h1>
          {invoices.map((invoice, i) => (
            <div className="border shadow mb-4 p-3" key={i}>
              <h2>Factura No: {invoice.invoiceNumber}</h2>
              <p>Monto: ${invoice.totalAmount}</p>
              {/* Abrir el PDF en una nueva pestaña */}
              <a 
                href={`http://localhost:8080/uploads/${invoice.invoiceNumber}.pdf`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-success"
              >
                Ver Factura
              </a>
              <button onClick={() => handleDelete(invoice._id)} className="btn btn-danger">
                Eliminar
              </button>
              <Link to={`/dashboard/admin/edit-invoice/${invoice._id}`} className="btn btn-primary">
                Editar
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={handleAddInvoice}
        className="btn btn-primary floating-button"
        style={{ position: "fixed", bottom: "20px", right: "20px", borderRadius: "50%", padding: "20px", fontSize: "24px" }}
      >
        +
      </button>
    </Layout>
  );
};

export default InvoiceList;
