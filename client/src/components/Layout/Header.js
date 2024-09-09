import { Badge, Dropdown, Menu, Button } from "antd"; // Importar Button de Ant Design
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom"; // Importar useNavigate para la redirección
import { useAuth } from "../../context/auth";
import SearchInput from "../Form/SearchInput";
import axios from "axios";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [notifications, setNotifications] = useState([]); // Estado para manejar las notificaciones
  const navigate = useNavigate(); // Hook de navegación

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  // Cargar notificaciones del usuario en sesión
  useEffect(() => {
    if (auth?.user) {
      fetchNotifications();
    }
  }, [auth]);

  const fetchNotifications = async () => {
    try {
      const { data } = await axios.get(`/api/v1/notifications/get-notifications/user/${auth.user._id}`);
      if (data.success) {
        setNotifications(data.data);
      }
    } catch (error) {
      console.error("Error al obtener las notificaciones:", error);
    }
  };

  // Calcular el número de notificaciones no leídas
  const unreadNotificationsCount = notifications.filter(notification => !notification.isRead).length;

  // Manejar clic en notificación para marcarla como leída y redirigir al producto usando slug
  const handleNotificationClick = async (notification) => {
    if (!notification.isRead) {
      await handleMarkAsRead(notification._id);
    }
    navigate(`/product/${notification.productSlug}`); // Redirigir a la página del producto usando el slug
  };

  // Manejar clic en el botón de marcar todas como leídas
  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.filter(notification => !notification.isRead).map(notification =>
          axios.put(`/api/v1/notifications/update-notification/${notification._id}`, { isRead: true })
        )
      );
      // Actualizar el estado de notificaciones localmente
      setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
      toast.success("Todas las notificaciones marcadas como leídas");
    } catch (error) {
      console.error("Error al marcar todas las notificaciones como leídas:", error);
      toast.error("Error al marcar todas las notificaciones como leídas");
    }
  };

  // Manejar clic en notificación individual para marcarla como leída
  const handleMarkAsRead = async (nid) => {
    try {
      const { data } = await axios.put(`/api/v1/notifications/update-notification/${nid}`, { isRead: true });
      if (data.success) {
        // Actualizar el estado de notificaciones localmente
        setNotifications(notifications.map(notification =>
          notification._id === nid ? { ...notification, isRead: true } : notification
        ));
      }
    } catch (error) {
      console.error("Error al marcar la notificación como leída:", error);
    }
  };

  // Crear el menú desplegable para las notificaciones
  const notificationMenu = (
    <Menu>
      <Menu.Item>
        <Button type="text" onClick={handleMarkAllAsRead} disabled={unreadNotificationsCount === 0}>
          Marcar todas como leídas
        </Button>
      </Menu.Item>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Menu.Item key={notification._id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                onClick={() => handleNotificationClick(notification)}
                className={notification.isRead ? "" : "font-weight-bold"}
                style={{ cursor: 'pointer', flexGrow: 1, marginRight: '10px' }}
              >
                {notification.message}
              </span>
              {!notification.isRead && (
                <Button
                  type="link"
                  onClick={() => handleMarkAsRead(notification._id)}
                  style={{ padding: 0 }}
                >
                  Marcar como leída
                </Button>
              )}
            </div>
          </Menu.Item>
        ))
      ) : (
        <Menu.Item>
          <span>No hay notificaciones</span>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              Medi Gestor
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" style={{ display: 'flex', alignItems: 'center' }}>
              <SearchInput />
              <li className="nav-item">
                <NavLink to="/" className="nav-link">
                  Inicio
                </NavLink>
              </li>
              {!auth?.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Registrar
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : auth?.user?.role === 2 ? "speaker" : "user"
                          }`}
                          className="dropdown-item"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          onClick={handleLogout}
                          to="/login"
                          className="dropdown-item"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {/* Icono de notificación con campanita usando un menú desplegable */}
                  <li className="nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                    <Dropdown overlay={notificationMenu} trigger={['click']} placement="bottomRight">
                      <Badge count={unreadNotificationsCount} showZero offset={[0, -5]}>
                        <span style={{ cursor: "pointer" }}>Notificaciones</span>
                      </Badge>
                    </Dropdown>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
