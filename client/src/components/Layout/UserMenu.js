import React from "react";
import { NavLink } from "react-router-dom";
const UserMenu = () => {
  return (
    <div>
      <div className="text-center dashboard-menu">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Perfil
          </NavLink>
          <NavLink
            to="/dashboard/user/appointments"
            className="list-group-item list-group-item-action"
          >
            Citas
          </NavLink>
          <NavLink
            to="/dashboard/user/documents"
            className="list-group-item list-group-item-action"
          >
            Docuemntos
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
