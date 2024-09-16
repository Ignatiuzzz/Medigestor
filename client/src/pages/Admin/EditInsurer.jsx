import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const EditInsurer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pricing, setPricing] = useState([{ service: "", price: "" }]);
  const [policies, setPolicies] = useState([{ policyType: "", coverage: "", premium: "" }]);
  const navigate = useNavigate();
  const { insurerId } = useParams();

  // Obtener los datos de la aseguradora por ID
  const getInsurerById = async () => {
    try {
      const { data } = await axios.get(`/api/v1/aseguradoras/get-insurer/${insurerId}`);
      const { name, email, phone, address, pricing, policies } = data.insurer;
      setName(name);
      setEmail(email);
      setPhone(phone);
      setAddress(address);
      setPricing(pricing);
      setPolicies(policies);
    } catch (error) {
      console.error("Error al obtener la aseguradora", error);
    }
  };

  // Actualizar la aseguradora
  const handleUpdateInsurer = async () => {
    try {
      const insurerData = { name, email, phone, address, pricing, policies };
      await axios.put(`/api/v1/aseguradoras/update-insurer/${insurerId}`, insurerData);
      navigate("/dashboard/admin/insurerList");
    } catch (error) {
      console.error("Error al actualizar la aseguradora", error);
      alert("No se pudo actualizar la aseguradora.");
    }
  };

  // Agregar un nuevo servicio (a la lista de precios)
  const addPricingRow = () => {
    setPricing([...pricing, { service: "", price: "" }]);
  };

  // Eliminar un servicio (de la lista de precios)
  const removePricingRow = (index) => {
    const newPricing = [...pricing];
    newPricing.splice(index, 1);
    setPricing(newPricing);
  };

  // Agregar una nueva póliza
  const addPolicyRow = () => {
    setPolicies([...policies, { policyType: "", coverage: "", premium: "" }]);
  };

  // Eliminar una póliza
  const removePolicyRow = (index) => {
    const newPolicies = [...policies];
    newPolicies.splice(index, 1);
    setPolicies(newPolicies);
  };

  useEffect(() => {
    getInsurerById();
  }, []);

  return (
    <Layout title={"Editar Aseguradora"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Editar Aseguradora</h1>
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

          {/* Lista de Precios (Servicios) */}
          <h4>Lista de Precios</h4>
          {pricing.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-5">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Servicio"
                  value={item.service}
                  onChange={(e) => {
                    const newPricing = [...pricing];
                    newPricing[index].service = e.target.value;
                    setPricing(newPricing);
                  }}
                />
              </div>
              <div className="col-md-5">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio"
                  value={item.price}
                  onChange={(e) => {
                    const newPricing = [...pricing];
                    newPricing[index].price = e.target.value;
                    setPricing(newPricing);
                  }}
                />
              </div>
              <div className="col-md-2">
                <button className="btn btn-danger" onClick={() => removePricingRow(index)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button onClick={addPricingRow} className="btn btn-secondary mb-4">
            Agregar otro servicio
          </button>

          {/* Pólizas */}
          <h4>Pólizas</h4>
          {policies.map((item, index) => (
            <div key={index} className="row mb-3">
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tipo de Póliza"
                  value={item.policyType}
                  onChange={(e) => {
                    const newPolicies = [...policies];
                    newPolicies[index].policyType = e.target.value;
                    setPolicies(newPolicies);
                  }}
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Cobertura"
                  value={item.coverage}
                  onChange={(e) => {
                    const newPolicies = [...policies];
                    newPolicies[index].coverage = e.target.value;
                    setPolicies(newPolicies);
                  }}
                />
              </div>
              <div className="col-md-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Prima"
                  value={item.premium}
                  onChange={(e) => {
                    const newPolicies = [...policies];
                    newPolicies[index].premium = e.target.value;
                    setPolicies(newPolicies);
                  }}
                />
              </div>
              <div className="col-md-1">
                <button className="btn btn-danger" onClick={() => removePolicyRow(index)}>
                  Eliminar
                </button>
              </div>
            </div>
          ))}
          <button onClick={addPolicyRow} className="btn btn-secondary mb-4">
            Agregar otra póliza
          </button>

          <button onClick={handleUpdateInsurer} className="btn btn-primary">
            Actualizar Aseguradora
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default EditInsurer;
