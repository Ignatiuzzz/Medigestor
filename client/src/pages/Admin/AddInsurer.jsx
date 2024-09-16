import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const AddInsurer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pricing, setPricing] = useState([{ service: "", price: "" }]);
  const [policies, setPolicies] = useState([{ policyType: "", coverage: "", premium: "" }]);
  const navigate = useNavigate();

  const handleInputChange = (index, field, value, listType) => {
    const newList = listType === "pricing" ? [...pricing] : [...policies];
    newList[index][field] = value;
    listType === "pricing" ? setPricing(newList) : setPolicies(newList);
  };

  const addRow = (listType) => {
    const newItem = listType === "pricing" ? { service: "", price: "" } : { policyType: "", coverage: "", premium: "" };
    listType === "pricing" ? setPricing([...pricing, newItem]) : setPolicies([...policies, newItem]);
  };

  // Eliminar una fila de servicios o pólizas
  const removeRow = (index, listType) => {
    const newList = listType === "pricing" ? [...pricing] : [...policies];
    newList.splice(index, 1);
    listType === "pricing" ? setPricing(newList) : setPolicies(newList);
  };

  // Verificar los datos enviados y capturar más detalles del error
  const handleCreateInsurer = async () => {
    try {
      const insurerData = { name, email, phone, address, pricing, policies };

      // Verificar en consola los datos antes de enviarlos
      console.log("Datos a enviar:", insurerData);

      const response = await axios.post("/api/v1/aseguradoras/create-insurer", insurerData);

      // Verificar la respuesta de la API
      console.log("Respuesta de la API:", response);

      navigate("/dashboard/admin/insurers");
    } catch (error) {
      // Mostrar el error completo en consola para obtener más detalles
      console.error("Error al registrar la aseguradora:", error.response ? error.response.data : error.message);

      // Opcional: mostrar un mensaje de alerta con el error detallado
      alert(`No se pudo registrar la aseguradora. Error: ${error.response ? error.response.data : error.message}`);
    }
  };

  return (
    <Layout title={"Agregar Nueva Aseguradora"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Agregar Aseguradora</h1>

          <div className="form-group mb-3">
            <label>Nombre de la Aseguradora:</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group mb-3">
            <label>Correo Electrónico:</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group mb-3">
            <label>Teléfono:</label>
            <input type="text" className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="form-group mb-3">
            <label>Dirección:</label>
            <input type="text" className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <h4>Lista de Precios</h4>
          {pricing.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Servicio"
                  value={item.service}
                  onChange={(e) => handleInputChange(index, "service", e.target.value, "pricing")}
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => handleInputChange(index, "price", e.target.value, "pricing")}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-danger" onClick={() => removeRow(index, "pricing")}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => addRow("pricing")} className="btn btn-secondary mb-4">
            Agregar otro servicio
          </button>

          <h4>Pólizas</h4>
          {policies.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Póliza"
                  value={item.policyType}
                  onChange={(e) => handleInputChange(index, "policyType", e.target.value, "policies")}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cobertura"
                  value={item.coverage}
                  onChange={(e) => handleInputChange(index, "coverage", e.target.value, "policies")}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Prima"
                  value={item.premium}
                  onChange={(e) => handleInputChange(index, "premium", e.target.value, "policies")}
                />
              </div>
              <div className="col-md-1">
                <button className="btn btn-danger" onClick={() => removeRow(index, "policies")}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button onClick={() => addRow("policies")} className="btn btn-secondary mb-4">
            Agregar otra póliza
          </button>

          <button onClick={handleCreateInsurer} className="btn btn-primary">
            Registrar Aseguradora
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default AddInsurer;
