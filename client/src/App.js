import { Route, Routes } from "react-router-dom";
import AdminRoute from "./components/Routes/AdminRoute";
import PrivateRoute from "./components/Routes/Private";
import About from "./pages/About";
import AdminAppointments from "./pages/Admin/AdminAppointments";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminList from "./pages/Admin/AdminList";
import CreateDoctor from "./pages/Admin/CreateDoctor"; // Import CreateDoctor page
import CreateSpecialty from "./pages/Admin/CreateSpecialty"; // Importing CreateSpecialty page
import Doctors from "./pages/Admin/Doctors"; // Import Doctors page
import ProfileEdit from "./pages/Admin/EditUser";
import UpdateDoctor from "./pages/Admin/UpdateDoctor"; // Import UpdateDoctor page
import Users from "./pages/Admin/UserList";
import Appointment from "./pages/Appointment"; // Import the Appointment page
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Contact from "./pages/Contact";
import HomePage from "./pages/HomePage";
import Pagenotfound from "./pages/Pagenotfound";
import Policy from "./pages/Policy";
import Search from "./pages/Search";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import UserAppointments from "./pages/user/UserAppointments"; // Import the UserAppointments page
import PaymentList from "./pages/Admin/PaymentList";
import AddPayment from "./pages/Admin/AddPayment";
import AddInvoice from "./pages/Admin/AddInvoice";
import AddInsurer from "./pages/Admin/AddInsurer";
import EditInsurer from "./pages/Admin/EditInsurer"; // Asegúrate de importar EditInsurer
import InsurerList from "./pages/Admin/InsurerList";
import InvoiceList from "./pages/Admin/InvoimentList";
import UserInvoiceList from "./pages/user/UserInvomentList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/appointments" element={<UserAppointments />} /> {/* User's Appointments page */}
          <Route path="user/documents" element={<UserInvoiceList />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/adminList" element={<AdminList />} />
          <Route path="admin/paymentList" element={<PaymentList />} />
          <Route path="admin/addPayment" element={<AddPayment />} />
          <Route path="admin/addInvoice/:invoiceId" element={<AddInvoice />} />
          <Route path="admin/invoiceList" element={<InvoiceList />} />

          <Route path="admin/addInsurer" element={<AddInsurer />} />
          <Route path="admin/documents" element={<UserInvoiceList />} />
          <Route path="admin/insurerList" element={<InsurerList />} />
          {/* Ajuste en la ruta para editar aseguradora */}
          <Route path="admin/editInsurer/:insurerId" element={<EditInsurer />} />

          <Route path="admin/edit/:adminId" element={<ProfileEdit />} />
          <Route path="admin/specialties" element={<CreateSpecialty />} /> {/* Create Specialty page */}
          <Route path="admin/doctors" element={<Doctors />} /> {/* Doctors list page */}
          <Route path="admin/create-doctor" element={<CreateDoctor />} /> {/* Create Doctor page */}
          <Route path="admin/doctor/:id" element={<UpdateDoctor />} /> {/* Update Doctor page */}
          <Route path="admin/appointments" element={<AdminAppointments />} /> 
        </Route>
        <Route path="/agendar-cita" element={<Appointment />} /> {/* Appointment scheduling page */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
