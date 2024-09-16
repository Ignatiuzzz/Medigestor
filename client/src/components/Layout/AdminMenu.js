import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Panel del Administrador</h4>
          <NavLink
            to="/dashboard/admin/adminList"
            className="list-group-item list-group-item-action"
          >
            Administradores
          </NavLink>
          <NavLink
            to="/dashboard/admin/paymentList"
            className="list-group-item list-group-item-action"
          >
            Lista de pagos
          </NavLink>
          <NavLink
            to="/dashboard/admin/addPayment"
            className="list-group-item list-group-item-action"
          >
            Agregar pago
          </NavLink>
          <NavLink
            to="/dashboard/admin/invoiceList"
            className="list-group-item list-group-item-action"
          >
            Lista de facturas
          </NavLink>
          <NavLink
            to="/dashboard/admin/addInsurer"
            className="list-group-item list-group-item-action"
          >
            Agregar aseguradora
          </NavLink>
          <NavLink
            to="/dashboard/admin/insurerList"
            className="list-group-item list-group-item-action"
          >
             Aseguradoras
          </NavLink>
          <NavLink
            to="/dashboard/admin/documents"
            className="list-group-item list-group-item-action"
          >
            Documentos
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            Usuarios
          </NavLink>
          <NavLink
            to="/dashboard/admin/doctors"
            className="list-group-item list-group-item-action"
          >
            Lista de Doctores
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-doctor"
            className="list-group-item list-group-item-action"
          >
            Crear Doctor
          </NavLink>
          <NavLink
            to="/dashboard/admin/specialties"
            className="list-group-item list-group-item-action"
          >
            Crear Especialidad
          </NavLink>
          <NavLink
            to="/dashboard/admin/appointments"
            className="list-group-item list-group-item-action"
          >
            Gestionar Citas
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
