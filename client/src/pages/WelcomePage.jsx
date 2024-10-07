import React from "react";
import Layout from "./../components/Layout/Layout";
import "../styles/WelcomePage.css";

const WelcomePage = () => {

  return (
    <Layout title="Bienvenido a Medigestor">
      <div className="welcome-container">
        
        {/* Sección de encabezado */}
        <section className="welcome-header">
          <h1>Bienvenido a <span className="highlight">Medigestor</span></h1>
          <p>
            Medigestor es el sistema integral de gestión clínica que optimiza la administración de clínicas, hospitales y consultorios. 
            Nuestra plataforma te permite gestionar citas, historiales médicos, campañas de marketing, y mucho más de manera eficiente 
            y segura. Medigestor está diseñado para hacer que tu práctica médica sea más productiva y rentable.
          </p>
        </section>

        {/* Sección de características destacadas */}
        <section className="features-section">
          <h2>Características principales de <span className="highlight">Medigestor</span></h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Gestión de Citas</h3>
              <p>
                Gestiona todas tus citas médicas con facilidad. Medigestor te permite agendar, modificar y cancelar citas en tiempo real, 
                enviando recordatorios automáticos a tus pacientes a través de email o WhatsApp.
              </p>
            </div>
            <div className="feature-item">
              <h3>Historial Médico Electrónico</h3>
              <p>
                Accede rápidamente al historial médico completo de tus pacientes desde cualquier dispositivo. 
                Toda la información está disponible de manera segura y ordenada.
              </p>
            </div>
            <div className="feature-item">
              <h3>Campañas Automatizadas</h3>
              <p>
                Aumenta la satisfacción de tus pacientes con campañas automatizadas. Puedes enviar recordatorios de citas, 
                encuestas de satisfacción o notificaciones importantes a tus pacientes mediante email o WhatsApp.
              </p>
            </div>
            <div className="feature-item">
              <h3>Integración con Aseguradoras</h3>
              <p>
                Medigestor está integrado con las principales aseguradoras, lo que facilita el manejo de coberturas y 
                trámites administrativos directamente desde la plataforma.
              </p>
            </div>
            <div className="feature-item">
              <h3>Reportes Personalizados</h3>
              <p>
                Genera reportes detallados y personalizados sobre el rendimiento de tu clínica. Medigestor te ofrece una 
                amplia variedad de métricas para analizar y mejorar tus procesos.
              </p>
            </div>
            <div className="feature-item">
              <h3>Soporte Multiplataforma</h3>
              <p>
                Accede a Medigestor desde cualquier dispositivo: computadora, tablet o móvil. Nuestra plataforma está optimizada 
                para que puedas gestionar tu clínica desde cualquier lugar.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de beneficios para el usuario */}
        <section className="benefits-section">
          <h2>Beneficios de usar <span className="highlight">Medigestor</span></h2>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h3>Mejora en la Eficiencia</h3>
              <p>
                Al digitalizar y automatizar procesos administrativos, Medigestor reduce el tiempo que pasas en tareas repetitivas, 
                lo que te permite concentrarte en lo que realmente importa: tus pacientes.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Reducción de Errores</h3>
              <p>
                La automatización de citas, historiales y facturación reduce significativamente los errores humanos, mejorando 
                la calidad de la atención y aumentando la satisfacción del paciente.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Seguridad y Cumplimiento</h3>
              <p>
                Con Medigestor, todos los datos están protegidos bajo estándares de seguridad de nivel médico, cumpliendo con las 
                regulaciones nacionales e internacionales como HIPAA y GDPR.
              </p>
            </div>
            <div className="benefit-item">
              <h3>Atención al Cliente 24/7</h3>
              <p>
                Nuestro equipo de soporte está disponible 24/7 para ayudarte a resolver cualquier duda o problema que puedas tener, 
                asegurándonos de que tu clínica funcione sin interrupciones.
              </p>
            </div>
          </div>
        </section>

        {/* Sección de testimonios */}
        <section className="testimonials-section">
          <h2>Lo que dicen nuestros clientes</h2>
          <div className="testimonials-grid">
            <div className="testimonial-item">
              <p>"Medigestor ha transformado completamente la forma en que gestionamos nuestra clínica. El sistema de recordatorios de citas ha reducido las ausencias y nos permite centrarnos más en la atención al paciente."</p>
              <h4>- Dr. Ana Pérez, Clínica Salud Plus</h4>
            </div>
            <div className="testimonial-item">
              <p>"Desde que comenzamos a usar Medigestor, la gestión de nuestro hospital es mucho más eficiente. La integración con las aseguradoras ha facilitado el manejo de trámites, y los reportes personalizados nos han permitido mejorar nuestros servicios."</p>
              <h4>- Dr. Carlos López, Hospital General Central</h4>
            </div>
            <div className="testimonial-item">
              <p>"Gracias a Medigestor, hemos podido automatizar nuestras campañas de marketing, lo que ha aumentado significativamente nuestra tasa de retención de pacientes."</p>
              <h4>- Dra. María González, Instituto Cardiovascular Elite</h4>
            </div>
          </div>
        </section>

        {/* Sección de planes */}
        <section className="plans-section">
          <h2>Nuestros Planes</h2>
          <table className="plans-table">
            <thead>
              <tr>
                <th>Característica</th>
                <th>Plan Médico</th>
                <th>Plan Clínica</th>
                <th>Plan Hospital</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Agendar citas</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Crear historial médico</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Documentos básicos</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Integración con aseguradoras</td>
                <td>✓</td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Documentación avanzada</td>
                <td></td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Exportación de documentos</td>
                <td></td>
                <td>✓</td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Campañas automatizadas (email, WhatsApp)</td>
                <td></td>
                <td></td>
                <td>✓</td>
              </tr>
              <tr>
                <td>Reportes personalizados</td>
                <td></td>
                <td></td>
                <td>✓</td>
              </tr>
            </tbody>
          </table>
        </section>

      </div>
    </Layout>
  );
};

export default WelcomePage;
