import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const CampaignDetails = () => {
  const { id } = useParams(); // Obtenemos el ID de la campaña desde la URL
  const [campaign, setCampaign] = useState(null);

  // Obtener los detalles de la campaña al cargar la página
  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const { data } = await axios.get(`/api/v1/campaigns/get-campaign/${id}`);
        setCampaign(data.campaign);
      } catch (error) {
        console.error("Error al obtener la campaña", error);
      }
    };
    fetchCampaign();
  }, [id]);

  if (!campaign) {
    return (
      <Layout title="Detalles de la campaña">
        <p>Cargando campaña...</p>
      </Layout>
    );
  }

  return (
    <Layout title={campaign.title}>
      <div className="container mt-4">
        <h1 className="text-center">{campaign.title}</h1>
        <div className="row">
          <div className="col-md-6">
            {campaign.image && (
              <img
                src={`http://localhost:8080/${campaign.image}`}
                alt={campaign.title}
                className="img-fluid"
              />
            )}
          </div>
          <div className="col-md-6">
            <h3>Descripción</h3>
            <p>{campaign.description}</p>

            <h3>Fechas</h3>
            <p>
              <strong>Inicio:</strong> {new Date(campaign.startDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Fin:</strong> {new Date(campaign.endDate).toLocaleDateString()}
            </p>

            <h3>Público Objetivo</h3>
            <p>{campaign.targetAudience.join(", ")}</p>

            <h3>Notificaciones</h3>
            <ul>
              {campaign.notifications.email && <li>Email</li>}
              {campaign.notifications.sms && <li>SMS</li>}
              {campaign.notifications.whatsapp && <li>WhatsApp</li>}
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignDetails;
