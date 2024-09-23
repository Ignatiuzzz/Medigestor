// cronJobs.js
import cron from 'node-cron';
import Appointment from './models/appointmentModel.js'; // Modelo de citas
import { sendAppointmentReminder } from './services/notificationService.js'; // Función de envío de notificaciones

// Cron job para verificar citas cada día a las 9 AM
const startCronJobs = () => {
  cron.schedule('0 9 * * *', async () => {
    try {
      const now = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1); // Obtén las citas de mañana

      // Encuentra citas que sean mañana
      const appointments = await Appointment.find({
        appointmentDate: {
          $gte: now,
          $lt: tomorrow,
        },
        status: 'Scheduled',
      }).populate('doctor', 'name');

      // Envía recordatorios
      for (const appointment of appointments) {
        await sendAppointmentReminder(appointment);
      }
    } catch (error) {
      console.error('Error enviando recordatorios: ', error);
    }
  });
};

export default startCronJobs;
