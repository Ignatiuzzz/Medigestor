import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const ListMarketingCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  // Obtener todas las campañas de marketing
  const getAllCampaigns = async () => {
    try {
      const { data } = await axios.get("/api/v1/campaigns/get-campaigns");
      setCampaigns(data.campaigns);
    } catch (error) {
      console.error("Error al obtener campañas de marketing", error);
    }
  };

  // Manejar la eliminación de una campaña
  const handleDelete = async (campaignId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta campaña?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/v1/campaigns/delete-campaign/${campaignId}`);
      getAllCampaigns(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar la campaña", error);
      alert("No se pudo eliminar la campaña.");
    }
  };

  useEffect(() => {
    getAllCampaigns();
  }, []);

  return (
    <Layout title={"Lista de Campañas de Marketing"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Todas las Campañas de Marketing</h1>
          {campaigns.length === 0 ? (
            <p>No hay campañas de marketing registradas.</p>
          ) : (
            campaigns.map((campaign, i) => (
              <div className="border shadow mb-4 p-3" key={i}>
                <div style={{ display: "flex", alignItems: "flex-start" }}> {/* Flexbox container */}
                  
                  {/* Imagen */}
                  {campaign.image && (
                    <div style={{ marginRight: "20px" }}> {/* Margen derecho para separar la imagen */}
                      <img
                        src={`http://localhost:8080/${campaign.image}`} // URL de la imagen
                        alt={campaign.title}
                        style={{ width: "200px", height: "auto" }} // Imagen con tamaño fijo
                      />
                    </div>
                  )}

                  {/* Información de la campaña */}
                  <div>
                    <h2>{campaign.title}</h2>
                    <p>Descripción: {campaign.description}</p>
                    <p>Fecha de Inicio: {new Date(campaign.startDate).toLocaleDateString()}</p>
                    <p>Fecha de Fin: {new Date(campaign.endDate).toLocaleDateString()}</p>
                    <p>Público Objetivo: {campaign.targetAudience.join(", ")}</p>

                    <Link to={`/dashboard/admin/editMarketing/${campaign._id}`} className="btn btn-primary">
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(campaign._id)}
                      className="btn btn-danger"
                      style={{ marginLeft: "10px" }}>
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ListMarketingCampaigns;
