import { Button, DatePicker, Input, Select } from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "./../components/Layout/Layout";

const { Option } = Select;

const Appointment = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [formData, setFormData] = useState({
    doctor: "",
    specialty: "",
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    appointmentDate: null,
    appointmentTime: "",
    reasonForVisit: "",
  });

  // Fetch specialties
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const { data } = await axios.get("/api/v1/specialty/get-specialties");
        if (data.success) {
          setSpecialties(data.specialties);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching specialties");
      }
    };

    fetchSpecialties();
  }, []);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get("/api/v1/doctor/get-doctors");
        if (data.success) {
          setDoctors(data.doctors);
        }
      } catch (error) {
        console.log(error);
        toast.error("Error fetching doctors");
      }
    };

    fetchDoctors();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      doctor,
      specialty,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate,
      appointmentTime,
      reasonForVisit,
    } = formData;

    if (
      !doctor ||
      !specialty ||
      !patientName ||
      !patientEmail ||
      !patientPhone ||
      !appointmentDate ||
      !appointmentTime ||
      !reasonForVisit
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await axios.post("/api/v1/appointment/create-appointment", {
        doctor,
        specialty,
        patientName,
        patientEmail,
        patientPhone,
        appointmentDate: moment(appointmentDate).format("YYYY-MM-DD"),
        appointmentTime,
        reasonForVisit,
      });

      if (response.data.success) {
        toast.success("Appointment created successfully");
        navigate("/"); // Redirect after success
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error creating appointment");
    }
  };

  return (
    <Layout title="Schedule Your Appointment">
      <div className="container mt-5">
        <h2 className="text-center mb-4">Schedule an Appointment</h2>
        <div className="appointment-form">
          <form onSubmit={handleSubmit}>
            {/* Patient Name */}
            <div className="mb-3">
              <Input
                type="text"
                name="patientName"
                placeholder="Your Name"
                value={formData.patientName}
                onChange={handleChange}
              />
            </div>

            {/* Patient Email */}
            <div className="mb-3">
              <Input
                type="email"
                name="patientEmail"
                placeholder="Your Email"
                value={formData.patientEmail}
                onChange={handleChange}
              />
            </div>

            {/* Patient Phone */}
            <div className="mb-3">
              <Input
                type="text"
                name="patientPhone"
                placeholder="Your Phone Number"
                value={formData.patientPhone}
                onChange={handleChange}
              />
            </div>

            {/* Select Specialty */}
            <div className="mb-3">
              <Select
                placeholder="Select Specialty"
                onChange={(value) => setFormData((prev) => ({ ...prev, specialty: value }))}
                style={{ width: "100%" }}
              >
                {specialties.map((specialty) => (
                  <Option key={specialty._id} value={specialty._id}>
                    {specialty.name}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Select Doctor */}
            <div className="mb-3">
              <Select
                placeholder="Select Doctor"
                onChange={(value) => setFormData((prev) => ({ ...prev, doctor: value }))}
                style={{ width: "100%" }}
              >
                {doctors.map((doctor) => (
                  <Option key={doctor._id} value={doctor._id}>
                    {doctor.name} {doctor.lastName}
                  </Option>
                ))}
              </Select>
            </div>

            {/* Appointment Date */}
            <div className="mb-3">
              <DatePicker
                placeholder="Select Appointment Date"
                style={{ width: "100%" }}
                onChange={(date) => setFormData((prev) => ({ ...prev, appointmentDate: date }))}
              />
            </div>

            {/* Appointment Time */}
            <div className="mb-3">
              <Input
                type="time"
                name="appointmentTime"
                placeholder="Select Appointment Time"
                value={formData.appointmentTime}
                onChange={handleChange}
              />
            </div>

            {/* Reason for Visit */}
            <div className="mb-3">
              <Input.TextArea
                name="reasonForVisit"
                placeholder="Reason for Visit"
                value={formData.reasonForVisit}
                onChange={handleChange}
                rows={4}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <Button type="primary" htmlType="submit">
                Schedule Appointment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Appointment;
