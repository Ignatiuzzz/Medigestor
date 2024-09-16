import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const InsurerList = () => {
  const [insurers, setInsurers] = useState([]);
  const navigate = useNavigate();

  // Obtener todas las aseguradoras
  const getAllInsurers = async () => {
    try {
      const { data } = await axios.get("/api/v1/aseguradoras/get-insurers");
      setInsurers(data.insurers);
    } catch (error) {
      console.error("Error al obtener aseguradoras", error);
    }
  };

  // Manejar la eliminación de una aseguradora
  const handleDelete = async (insurerId) => {
    const isConfirmed = window.confirm("¿Estás seguro de que quieres eliminar esta aseguradora?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/api/v1/aseguradoras/delete-insurer/${insurerId}`);
      getAllInsurers(); // Recargar la lista después de eliminar
    } catch (error) {
      console.error("Error al eliminar aseguradora", error);
      alert("No se pudo eliminar la aseguradora.");
    }
  };

  useEffect(() => {
    getAllInsurers();
  }, []);

  return (
    <Layout title={"Lista de Aseguradoras"}>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">Todas las Aseguradoras</h1>
          {insurers.length === 0 ? (
            <p>No hay aseguradoras registradas.</p>
          ) : (
            insurers.map((insurer, i) => (
              <div className="border shadow mb-4 p-3" key={i}>
                <h2>{insurer.name}</h2>
                <p>Email: {insurer.email}</p>
                <p>Teléfono: {insurer.phone}</p>
                <p>Dirección: {insurer.address}</p>
                <p>Precios: {insurer.pricing.map((p, idx) => (
                  <span key={idx}>{p.service}: ${p.price} </span>
                ))}</p>
                <p>Pólizas: {insurer.policies.map((p, idx) => (
                  <span key={idx}>{p.policyType}: {p.coverage} - ${p.premium} </span>
                ))}</p>
                <Link to={`/dashboard/admin/editInsurer/${insurer._id}`} className="btn btn-primary">Editar</Link>
                <button 
                  onClick={() => handleDelete(insurer._id)} 
                  className="btn btn-danger" 
                  style={{ marginLeft: "10px" }}>
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InsurerList;
