import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const UserInvoiceList = () => {
  const { userId } = useParams();
  const [invoices, setInvoices] = useState([]);

  const getUserInvoices = async () => {
    try {
      const { data } = await axios.get(`/api/v1/invoice/get-invoices-by-user/${userId}`);
      setInvoices(data.invoices);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserInvoices();
  }, []);

  return (
    <Layout title={"Facturas del Usuario"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Facturas del Usuario</h1>
          {invoices.map((invoice, i) => (
            <div className="border shadow mb-4 p-3" key={i}>
              <h2>Factura No: {invoice.invoiceNumber}</h2>
              <p>Monto: ${invoice.totalAmount}</p>
              <a href={`/uploads/${invoice.invoiceFile}`} className="btn btn-success" target="_blank" rel="noopener noreferrer">
                Descargar Factura
              </a>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default UserInvoiceList;
