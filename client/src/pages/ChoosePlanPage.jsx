import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";
import "../styles/ChoosePlanPage.css";
import axios from "axios";
import { useAuth } from "../context/auth"; // Importar el AuthContext

const ChoosePlanPage = () => {
  const [auth] = useAuth(); // Usar el estado de autenticación
  const navigate = useNavigate();

  const handleSelectPlan = async (planName) => {
    let plan;

    // Mapear el nombre del plan al número correspondiente
    switch (planName) {
      case "Plan Médico":
        plan = 0;
        break;
      case "Plan Clínica":
        plan = 1;
        break;
      case "Plan Hospital":
        plan = 2;
        break;
      default:
        plan = 0;
    }

    if (!auth?.user) {
      // Redirigir al login si el usuario no está autenticado
      navigate("/login");
      return;
    }

    try {
      // Obtener el ID del usuario autenticado desde el contexto
      const userId = auth.user._id;

      // Actualizar el plan del usuario llamando a la API
      await axios.put(`/api/v1/user/update-plan/${userId}`, { plan });

      alert(`Has seleccionado el ${planName} correctamente!`);
    } catch (error) {
      console.error("Error al seleccionar el plan:", error);
      alert("Hubo un problema al actualizar tu plan. Inténtalo de nuevo más tarde.");
    }
  };

  return (
    <Layout title="Elige tu Plan - Medigestor">
      <div className="choose-plan-container">
        <h1 className="choose-plan-title">Elige el plan que mejor se adapte a tus necesidades</h1>
        <div className="plans-grid">
          {/* Plan Médico */}
          <div className="plan-card">
            <h3>Plan Médico</h3>
            <p>Ideal para consultorios médicos que desean organizar citas, historiales y documentos básicos de forma eficiente.</p>
            <ul>
              <li>✔ Agendar citas</li>
              <li>✔ Crear historial médico</li>
              <li>✔ Documentos básicos</li>
              <li>✔ Integración con aseguradoras</li>
            </ul>
            <button className="select-plan-button" onClick={() => handleSelectPlan("Plan Médico")}>
              Seleccionar Plan Médico
            </button>
          </div>

          {/* Plan Clínica */}
          <div className="plan-card">
            <h3>Plan Clínica</h3>
            <p>Perfecto para clínicas que necesitan más funcionalidades como documentación avanzada y exportación de datos.</p>
            <ul>
              <li>✔ Agendar citas</li>
              <li>✔ Crear historial médico</li>
              <li>✔ Documentos básicos y avanzados</li>
              <li>✔ Integración con aseguradoras</li>
              <li>✔ Exportación de documentos</li>
            </ul>
            <button className="select-plan-button" onClick={() => handleSelectPlan("Plan Clínica")}>
              Seleccionar Plan Clínica
            </button>
          </div>

          {/* Plan Hospital */}
          <div className="plan-card">
            <h3>Plan Hospital</h3>
            <p>El plan más completo, diseñado para hospitales que requieren automatización de campañas y reportes personalizados.</p>
            <ul>
              <li>✔ Agendar citas</li>
              <li>✔ Crear historial médico</li>
              <li>✔ Documentos avanzados y exportación</li>
              <li>✔ Integración con aseguradoras</li>
              <li>✔ Campañas automatizadas</li>
              <li>✔ Reportes personalizados</li>
            </ul>
            <button className="select-plan-button" onClick={() => handleSelectPlan("Plan Hospital")}>
              Seleccionar Plan Hospital
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChoosePlanPage;
