import nodemailer from 'nodemailer';
import twilio from 'twilio';
import dotenv from "dotenv";
dotenv.config();

// Configura Twilio
const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Configura Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // O el servicio de correo que utilices
  auth: {
    user: process.env.EMAIL_USER, // Configura tu correo
    pass: process.env.EMAIL_PASS, // Configura tu contraseña
  },
});

// Función para enviar correo electrónico
const sendEmailReminder = async (appointment) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: appointment.patientEmail,
    subject: `Recordatorio de cita médica - ${appointment.appointmentDate}`,
    text: `Hola ${appointment.patientName}, este es un recordatorio de tu cita con el Dr./Dra. ${appointment.doctor.name} el día ${appointment.appointmentDate} a las ${appointment.appointmentTime}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a: ${appointment.patientEmail}`);
  } catch (error) {
    console.error(`Error enviando correo a ${appointment.patientEmail}: `, error);
  }
};

// Función para enviar mensaje de WhatsApp
const sendWhatsAppReminder = async (appointment) => {
  const phoneWithCountryCode = `+591${appointment.patientPhone}`; // Agrega el prefijo de Bolivia
  try {
    const message = await twilioClient.messages.create({
      body: `Hola ${appointment.patientName}, este es un recordatorio de tu cita con el Dr./Dra. ${appointment.doctor.name} el ${appointment.appointmentDate} a las ${appointment.appointmentTime}.`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Tu número de Twilio habilitado para WhatsApp
      to: `whatsapp:${phoneWithCountryCode}`,
    });
    console.log(`WhatsApp enviado a: ${phoneWithCountryCode}`);
  } catch (error) {
    console.error(`Error enviando WhatsApp a ${phoneWithCountryCode}: `, error);
  }
};

// Función para enviar recordatorios de cita
export const sendAppointmentReminder = async (appointment) => {
  await sendEmailReminder(appointment);
  await sendWhatsAppReminder(appointment);
};
export const sendEmailNotification = async (user, campaign) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: `Nueva campaña de marketing: ${campaign.title}`,
    text: `Hola ${user.name}, se ha lanzado una nueva campaña: ${campaign.title}. ${campaign.description}.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a: ${user.email}`);
  } catch (error) {
    console.error(`Error enviando correo a ${user.email}: `, error);
  }
};

// Función para enviar mensaje de WhatsApp para una campaña
export const sendWhatsAppNotification = async (user, campaign) => {
  if (!user.phone) {
    console.log(`El usuario ${user.name} no tiene un número de teléfono registrado.`);
    return;
  }
  
  const phoneWithCountryCode = `+591${user.phone}`; // Agregar el prefijo del país

  try {
    const message = await twilioClient.messages.create({
      body: `Hola ${user.name}, se ha lanzado una nueva campaña: ${campaign.title}. ${campaign.description}.`,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`, // Tu número de Twilio habilitado para WhatsApp
      to: `whatsapp:${phoneWithCountryCode}`,
    });
    console.log(`WhatsApp enviado a: ${phoneWithCountryCode}`);
  } catch (error) {
    console.error(`Error enviando WhatsApp a ${phoneWithCountryCode}: `, error);
  }
};

// Función para enviar notificaciones de una campaña
export const sendCampaignNotifications = async (campaign, users) => {
  for (const user of users) {
    await sendEmailNotification(user, campaign);
  //  await sendWhatsAppNotification(user, campaign);
  }
};