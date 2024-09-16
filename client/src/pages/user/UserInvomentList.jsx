import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import AdminMenu from "../../components/Layout/AdminMenu";

const UserInvoiceList = () => {
  const userId = localStorage.getItem("userId");  // Obtener el ID del usuario logueado
  const [invoices, setInvoices] = useState([]);
  const [user, setUser] = useState(null);  // Cambia 'userd' por 'user' para mayor claridad

  const getUserInvoices = async () => {
    try {
      // Obtener los datos del usuario desde el endpoint correcto
      const response = await axios.get(`/api/v1/user/getUser/${userId}`);
      const fetchedUser = response.data.user;  // Accede correctamente a los datos de la respuesta
      setUser(fetchedUser);
      console.log(fetchedUser);  // Verifica que los datos del usuario se reciban correctamente

      // Obtener las facturas del usuario (puedes agregar esto si es necesario)
       const { data } = await axios.get(`/api/v1/invoice/get-invoices-by-user/${userId}`);
       setInvoices(data.invoices);
    } catch (error) {
      console.error("Error al obtener los datos del usuario:", error);
    }
  };

  useEffect(() => {
    getUserInvoices();
  }, []);

  return (
    <Layout title={"Documentos del Usuario"}>
      <div className="row dashboard">
        <div className="col-md-3">
          {/* Verifica si 'user' no es null antes de acceder a 'user.role' */}
          {user ? (
            user.role === 0 ? <UserMenu /> : <AdminMenu />
          ) : (
            <p>Cargando menús...</p>
          )}
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Documentos del Usuario</h1>
          {/* Mostrar los datos del usuario */}
          {user ? (
            <div>
              <h2>Usuario: {user.name}</h2>
              <p>Email: {user.email}</p>
              <p>Teléfono: {user.phone}</p>
              <p>Dirección: {user.address}</p>
            </div>
          ) : (
            <p>Cargando información del usuario...</p>
          )}

          {/* Listar las facturas del usuario */}
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
