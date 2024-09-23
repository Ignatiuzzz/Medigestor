import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { formatCountdown } from "antd/es/statistic/utils";

const AddMarketingCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targetAudience, setTargetAudience] = useState([""]);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [image, setImage] = useState(null); // Nuevo estado para la imagen
  const navigate = useNavigate();

  // Manejar cambios en el público objetivo
  const handleInputChange = (index, value) => {
    const newAudience = [...targetAudience];
    newAudience[index] = value;
    setTargetAudience(newAudience);
  };

  // Añadir otra entrada para el público objetivo
  const addAudienceRow = () => setTargetAudience([...targetAudience, ""]);

  // Eliminar fila del público objetivo
  const removeAudienceRow = (index) => {
    const newAudience = [...targetAudience];
    newAudience.splice(index, 1);
    setTargetAudience(newAudience);
  };

  // Manejar la carga de la imagen
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]); // Guardar el archivo de imagen en el estado
  };
  const userId = localStorage.getItem("userId");

  // Crear la campaña de marketing con la imagen incluida
  const handleCreateCampaign = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      formData.append("targetAudience", JSON.stringify(targetAudience));
      formData.append("notifications", JSON.stringify(notifications));
      formData.append("user", userId);
  
      // Verificar si se seleccionó una imagen y añadirla al FormData
      if (image) {
        formData.append("image", image);
      }
  
      // Realizar la petición POST para crear la campaña
      const response = await axios.post("/api/v1/campaigns/create-campaign", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Navegar a la lista de campañas si la creación fue exitosa
      navigate("/dashboard/admin/listMarketing");
    } catch (error) {
      console.error("Error al crear la campaña:", error.response ? error.response.data : error.message);
      alert(`No se pudo crear la campaña. Error: ${error.response ? error.response.data : error.message}`);
    }
  };
  
  
  return (
    <Layout title={"Agregar Campaña de Marketing"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Agregar Campaña de Marketing</h1>

          <div className="form-group mb-3">
            <label>Título:</label>
            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="form-group mb-3">
            <label>Descripción:</label>
            <textarea
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label>Fecha de Inicio:</label>
            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </div>

          <div className="form-group mb-3">
            <label>Fecha de Fin:</label>
            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>

          <h4>Público Objetivo</h4>
          {targetAudience.map((audience, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Público Objetivo"
                  value={audience}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-danger" onClick={() => removeAudienceRow(index)}>Eliminar</button>
              </div>
            </div>
          ))}
          <button onClick={addAudienceRow} className="btn btn-secondary mb-4">Agregar otro público objetivo</button>

          <h4>Notificaciones</h4>
          <div className="form-group mb-3">
            <label>
              <input type="checkbox" checked={notifications.email} onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })} />
              Enviar por Email
            </label>
          </div>
          
          <div className="form-group mb-3">
            <label>
              <input type="checkbox" checked={notifications.whatsapp} onChange={(e) => setNotifications({ ...notifications, whatsapp: e.target.checked })} />
              Enviar por WhatsApp
            </label>
          </div>

          <div className="form-group mb-3">
            <label>Subir Imagen:</label>
            <input type="file" className="form-control" accept="image/*" onChange={handleImageUpload} />
          </div>

          <button onClick={handleCreateCampaign} className="btn btn-primary">Registrar Campaña</button>
        </div>
      </div>
    </Layout>
  );
};

export default AddMarketingCampaign;
