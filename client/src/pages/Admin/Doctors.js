import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.get("/api/v1/doctor/get-doctors");
      setDoctors(data.doctors);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching doctors");
    }
  };

  // Lifecycle method to get doctors
  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <Layout>
      <div className="row dashboard">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">Lista de Todos los Doctores</h1>
          <div className="d-flex flex-wrap">
            {doctors?.map((doctor) => (
              <Link
                key={doctor._id}
                to={`/dashboard/admin/doctor/${doctor._id}`} // Assuming ID is used for doctor route
                className="doctor-link"
              >
                <div className="card m-2" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{doctor.name} {doctor.lastName}</h5>
                    <p className="card-text">
                      Especialidad: {doctor.specialty.name}
                    </p>
                    <p className="card-text">
                      Años de Experiencia: {doctor.yearsOfExperience}
                    </p>
                    <p className="card-text">
                      Dirección de la Clínica: {doctor.clinicAddress}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Doctors;
