import { Button, Modal, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";

const { Option } = Select;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [status, setStatus] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch all appointments
  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get("/api/v1/appointment/all-appointments");
      if (data.success) {
        setAppointments(data.appointments);
      } else {
        toast.error("Error loading appointments");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error loading appointments");
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Delete an appointment
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/v1/appointment/delete-appointment/${id}`);
      if (data.success) {
        toast.success("Appointment deleted successfully");
        fetchAppointments(); // Refresh appointments list
      } else {
        toast.error("Error deleting appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error deleting appointment");
    }
  };

  // Update appointment status
  const handleUpdate = async (id) => {
    try {
      const { data } = await axios.put(`/api/v1/appointment/update-appointment/${id}`, { status });
      if (data.success) {
        toast.success("Appointment updated successfully");
        fetchAppointments(); // Refresh appointments list
        setIsModalVisible(false); // Close modal
      } else {
        toast.error("Error updating appointment");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating appointment");
    }
  };

  // Open modal to edit appointment
  const openModal = (appointment) => {
    setEditingAppointment(appointment);
    setStatus(appointment.status);
    setIsModalVisible(true);
  };

  // Close modal
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Layout title="Admin - Manage Appointments">
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h4 className="text-center mb-4">Manage Appointments</h4>

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

                      <Button type="primary" onClick={() => openModal(appointment)}>Edit</Button>
                      <Button type="danger" className="ms-3" onClick={() => handleDelete(appointment._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No appointments available.</p>
            )}

            {/* Modal for editing appointment status */}
            {editingAppointment && (
              <Modal
                title="Update Appointment Status"
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={() => handleUpdate(editingAppointment._id)}
              >
                <Select
                  value={status}
                  onChange={(value) => setStatus(value)}
                  style={{ width: "100%" }}
                >
                  <Option value="Scheduled">Scheduled</Option>
                  <Option value="Completed">Completed</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminAppointments;
