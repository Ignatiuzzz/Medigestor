import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import SpecialtyForm from "../../components/Form/SpecialtyForm";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const CreateSpecialty = () => {
  const [specialties, setSpecialties] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");

  // Handle specialty form submission for creating a new specialty
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/specialty/create-specialty", {
        name,
        description,
      });
      if (data?.success) {
        toast.success(`Especialidad ${name} creada con éxito`);
        getAllSpecialties();
        setName("");
        setDescription("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al crear especialidad");
    }
  };

  // Fetch all specialties
  const getAllSpecialties = async () => {
    try {
      const { data } = await axios.get("/api/v1/specialty/get-specialties");
      if (data?.success) {
        setSpecialties(data?.specialties);
      }
    } catch (error) {
      console.log(error);
      toast.error("Algo salió mal al obtener las especialidades");
    }
  };

  useEffect(() => {
    getAllSpecialties();
  }, []);

  // Handle specialty update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/specialty/update-specialty/${selected._id}`,
        { name: updatedName, description: updatedDescription }
      );
      if (data?.success) {
        toast.success(`Especialidad ${updatedName} actualizada con éxito`);
        setSelected(null);
        setUpdatedName("");
        setUpdatedDescription("");
        setVisible(false);
        getAllSpecialties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error al actualizar especialidad");
    }
  };

  // Handle specialty deletion
  const handleDelete = async (sId) => {
    try {
      const { data } = await axios.delete(`/api/v1/specialty/delete-specialty/${sId}`);
      if (data.success) {
        toast.success("La especialidad se ha eliminado");
        getAllSpecialties();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Algo salió mal");
    }
  };

  return (
    <Layout title={"Dashboard - Crear y Administrar Especialidades"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Crear y Administrar Especialidades</h1>
            <div className="p-3 w-50">
              <SpecialtyForm
                handleSubmit={handleSubmit}
                name={name}
                setName={setName}
                description={description}
                setDescription={setDescription}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {specialties?.map((s) => (
                    <tr key={s._id}>
                      <td>{s.name}</td>
                      <td>{s.description}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(s.name);
                            setUpdatedDescription(s.description);
                            setSelected(s);
                          }}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => {
                            handleDelete(s._id);
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              visible={visible}
            >
              <SpecialtyForm
                handleSubmit={handleUpdate}
                name={updatedName}
                setName={setUpdatedName}
                description={updatedDescription}
                setDescription={setUpdatedDescription}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateSpecialty;
