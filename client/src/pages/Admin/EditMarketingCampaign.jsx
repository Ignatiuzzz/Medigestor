import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const EditMarketingCampaign = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [targetAudience, setTargetAudience] = useState([]);
  const [notifications, setNotifications] = useState({
    email: false,
    sms: false,
    whatsapp: false,
  });
  const [image, setImage] = useState(null); // Nuevo estado para la imagen
  const [currentImage, setCurrentImage] = useState(null); // Estado para mostrar la imagen actual
  const navigate = useNavigate();
  const { id } = useParams(); // Para obtener el ID de la campaña desde la URL
console.log(id);
  useEffect(() => {
    loadCampaign(); // Cargar datos de la campaña al montar el componente
  }, []);

  // Cargar los datos de la campaña existente
  const loadCampaign = async () => {
    try {
      const { data } = await axios.get(`/api/v1/campaigns/get-campaign/${id}`);
      const campaign = data.campaign;
      console.log(campaign);
      setTitle(campaign.title);
      setDescription(campaign.description);
      setStartDate(campaign.startDate.split("T")[0]); // Formateamos la fecha
      setEndDate(campaign.endDate.split("T")[0]); // Formateamos la fecha
      setTargetAudience(campaign.targetAudience);
      setNotifications(campaign.notifications);
      setCurrentImage(campaign.image); // Cargamos la imagen actual
    } catch (error) {
      console.error("Error al cargar la campaña:", error);
    }
  };

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
    setImage(e.target.files[0]); // Guardar la nueva imagen en el estado
  };

  // Actualizar la campaña de marketing con los datos incluidos
  const handleUpdateCampaign = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
      
      // Asegúrate de que targetAudience no esté vacío ni undefined
      if (targetAudience.length > 0) {
        formData.append("targetAudience", JSON.stringify(targetAudience));
      }
  
      // Asegúrate de que notifications no esté vacío ni undefined
      if (notifications) {
        formData.append("notifications", JSON.stringify(notifications));
      }
  
      // Solo añadir la nueva imagen si se ha seleccionado una
      if (image) {
        formData.append("image", image); // Añadir la nueva imagen si se subió una
      }
  
      await axios.put(`/api/v1/campaigns/update-campaign/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      navigate("/dashboard/admin/listMarketing");
    } catch (error) {
      console.error("Error al actualizar la campaña:", error.response ? error.response.data : error.message);
      alert(`No se pudo actualizar la campaña. Error: ${error.response ? error.response.data : error.message}`);
    }
  };
  
  
  
  return (
    <Layout title={"Editar Campaña de Marketing"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Editar Campaña de Marketing</h1>

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
              <input type="checkbox" checked={notifications.sms} onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })} />
              Enviar por SMS
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

          {currentImage && (
            <div className="mb-3">
              <p>Imagen Actual:</p>
              <img src={`http://localhost:5000/${currentImage}`} alt="Current" style={{ width: "200px" }} />
            </div>
          )}

          <button onClick={handleUpdateCampaign} className="btn btn-primary">Actualizar Campaña</button>
        </div>
      </div>
    </Layout>
  );
};

export default EditMarketingCampaign;
