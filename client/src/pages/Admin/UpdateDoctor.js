import { Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const { Option } = Select;

const UpdateDoctor = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [specialties, setSpecialties] = useState([]);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [id, setId] = useState("");

  // Fetch individual doctor details
  const getSingleDoctor = async () => {
    try {
      const { data } = await axios.get(`/api/v1/doctor/get-doctor/${params.id}`);
      setName(data.doctor.name);
      setLastName(data.doctor.lastName);
      setId(data.doctor._id);
      setEmail(data.doctor.email);
      setPhone(data.doctor.phone);
      setSpecialty(data.doctor.specialty._id);
      setYearsOfExperience(data.doctor.yearsOfExperience);
      setClinicAddress(data.doctor.clinicAddress);
    } catch (error) {
      console.log(error);
      toast.error("Error fetching doctor details");
    }
  };

  useEffect(() => {
    getSingleDoctor();
  }, []);

  // Fetch all specialties
  useEffect(() => {
    const getAllSpecialties = async () => {
      try {
        const { data } = await axios.get("/api/v1/specialty/get-specialties");
        if (data?.success) {
          setSpecialties(data?.specialties);
        }
      } catch (error) {
        console.error(error);
        toast.error("Error fetching specialties");
      }
    };

    getAllSpecialties();
  }, []);

  // Update doctor information
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDoctor = {
        name,
        lastName,
        email,
        phone,
        specialty,
        yearsOfExperience,
        clinicAddress,
      };

      const { data } = await axios.put(`/api/v1/doctor/update-doctor/${id}`, updatedDoctor);
      if (data?.success) {
        toast.success("Doctor updated successfully");
        navigate("/dashboard/admin/doctors");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // Delete a doctor
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure you want to delete this doctor?");
      if (!answer) return;
      const { data } = await axios.delete(`/api/v1/doctor/delete-doctor/${id}`);
      toast.success("Doctor deleted successfully");
      navigate("/dashboard/admin/doctors");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Update Doctor"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Actualiza un Doctor</h1>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Nombre"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={lastName}
                  placeholder="Apellido"
                  className="form-control"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phone}
                  placeholder="Número de teléfono"
                  className="form-control"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={yearsOfExperience}
                  placeholder="Años de Experiencia"
                  className="form-control"
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={clinicAddress}
                  placeholder="Dirección de la Clínica"
                  className="form-control"
                  onChange={(e) => setClinicAddress(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Seleccionar Especialidad"
                  size="large"
                  className="form-select mb-3"
                  onChange={(value) => setSpecialty(value)}
                  value={specialty}
                >
                  {specialties?.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  ACTUALIZA DOCTOR
                </button>
              </div>
              <div className="mb-3">
                <button className="btn btn-danger" onClick={handleDelete}>
                  ELIMINA DOCTOR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateDoctor;
