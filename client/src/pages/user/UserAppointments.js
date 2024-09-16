import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import Layout from "./../../components/Layout/Layout";

const UserAppointments = () => {
  const [auth] = useAuth(); // Get user information from auth context
  const [appointments, setAppointments] = useState([]);

  // Fetch user-specific appointments
  const fetchUserAppointments = async () => {
    try {
      const { data } = await axios.get(`/api/v1/appointment/get-user-appointments/${auth?.user?._id}`); // Assuming the API endpoint returns appointments for the logged-in user
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error("Failed to load appointments");
      }
    } catch (error) {
      console.error("Error fetching appointments", error);
      toast.error("Error fetching appointments");
    }
  };

  useEffect(() => {
    if (auth?.user?._id) {
      fetchUserAppointments();
    }
  }, [auth?.user?._id]);

  return (
    <Layout title="Your Appointments">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center mb-4">Your Appointments</h4>

            {appointments.length > 0 ? (
              <div className="appointment-list">
                {appointments.map((appointment) => (
                  <div key={appointment._id} className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Doctor: {appointment.doctor.name} {appointment.doctor.lastName}</h5>
                      <p className="card-text">Specialty: {appointment.specialty.name}</p>
                      <p className="card-text">Date: {new Date(appointment.appointmentDate).toLocaleDateString()}</p>
                      <p className="card-text">Time: {appointment.appointmentTime}</p>
                      <p className="card-text">Reason: {appointment.reasonForVisit}</p>
                      <p className="card-text">Status: {appointment.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">You have no scheduled appointments.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserAppointments;
