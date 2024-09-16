import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const { Option } = Select;

const CreateDoctor = () => {
  const navigate = useNavigate();
  const [specialties, setSpecialties] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: "",
    yearsOfExperience: "",
    clinicAddress: "",
  });

  // Fetch all specialties for the doctor
  useEffect(() => {
    const getAllSpecialties = async () => {
      try {
        const specialtyData = await axios.get("/api/v1/specialty/get-specialties");
        if (specialtyData?.data?.success) {
          setSpecialties(specialtyData?.data?.specialties);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching specialties");
      }
    };

    getAllSpecialties();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Form submission handler
  const handleCreate = async (e) => {
    e.preventDefault();
    const { name, lastName, email, phone, specialty, yearsOfExperience, clinicAddress } = formData;

    // Validation
    if (
      !name.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !specialty ||
      !yearsOfExperience.trim() ||
      !clinicAddress.trim()
    ) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const { data } = await axios.post("/api/v1/doctor/create-doctor", formData);
      if (data?.success) {
        toast.success("Doctor created successfully");
        navigate("/dashboard/admin/doctors");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Doctor"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Doctor</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Nombre"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  placeholder="Apellido"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  placeholder="Número de Teléfono"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  name="yearsOfExperience"
                  value={formData.yearsOfExperience}
                  placeholder="Años de Experiencia"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  name="clinicAddress"
                  value={formData.clinicAddress}
                  placeholder="Dirección de la Clínica"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Seleccionar Especialidad"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setFormData((prev) => ({ ...prev, specialty: value }))}
                >
                  {specialties.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleCreate}>
                  CREATE DOCTOR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateDoctor;
