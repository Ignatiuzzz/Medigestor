import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Homepage.css";
import Layout from "./../components/Layout/Layout";

// Importar iconos de Material UI
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    {
      name: "Consultorios",
      img: "/images/consultorio.png",
      slug: "consultorios",
    },
    {
      name: "Emergencia",
      img: "/images/emergencia.png",
      slug: "emergencia",
    },
    {
      name: "Instituto Cardiovascular",
      img: "/images/cardiovascular.png",
      slug: "instituto-cardiovascular",
    },
    {
      name: "Laboratorio",
      img: "/images/laboratorio.png",
      slug: "laboratorio",
    },
    {
      name: "Imagen Médica",
      img: "/images/imagen.png",
      slug: "imagen-medica",
    },
    {
      name: "Endoscopía",
      img: "/images/endoscopia.png",
      slug: "endoscopia",
    },
  ]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Cargar más Eventos
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Medigestor"}>
      {/* Imagen del banner */}
      <img
        src="/images/banner.png"
        className="banner-img"
        alt="imagen del banner"
        width={"100%"}
        style={{ borderRadius: "10px", marginBottom: "20px" }}
      />

      {/* Sección de botones debajo del banner */}
      <div className="banner-buttons-container" style={{ display: 'flex', justifyContent: 'space-around', marginTop: '-50px' }}>
        <div className="banner-button" style={styles.button} onClick={() => navigate("/agendar-cita")}>
          <CalendarTodayIcon style={styles.icon} />
          <p>Agenda tu consulta</p>
        </div>
        <div className="banner-button" style={styles.button} onClick={() => navigate("/revisar-resultados")}>
          <DescriptionIcon style={styles.icon} />
          <p>Revisa tus resultados</p>
        </div>
        <div className="banner-button" style={styles.button} onClick={() => navigate("/experiencia")}>
          <ChatIcon style={styles.icon} />
          <p>Cuéntanos tu experiencia</p>
        </div>

      </div>

      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className="text-center">Filtrar por categoría</h4>
          <div className="d-flex flex-column filter-section">
            {categories?.map((c) => (
              <div
                key={c.slug}
                onClick={() => navigate(`/category/${c.slug}`)}
                style={{ cursor: "pointer" }}
                className="category-item d-flex align-items-center"
              >
                <img
                  src={c.img}
                  alt={c.name}
                  style={{ width: "30px", marginRight: "10px" }}
                />
                {c.name}
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-9 ">
          <h1 className="text-center">Servicios</h1>
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((p) => (
              <div className="card product-card m-3" key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }} // Añadir estilo de cursor
                />
                <div className="card-body">
                  <div className="card-title-price">
                    <h5 className="card-title">{p.name}</h5>
                    <h5 className="card-price">
                      {p.price.toLocaleString("es-ES", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                  </div>
                  <p className="card-text">
                    {p.description.substring(0, 60)}...
                  </p>
                  <div className="card-buttons">
                    <button
                      className="btn btn-info ms-1"
                      onClick={() => navigate(`/product/${p.slug}`)}
                    >
                      Más detalles
                    </button>
                    <button className="btn btn-dark ms-1">Registrar cita</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sección de Especialidades */}
          <div className="mt-5">
            <p className="text-center">
              Medigestor, más de 40 años cuidando tu salud y la de tu familia.
            </p>
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src="/images/consultorio.png"
                  alt="Consultorios"
                  onClick={() => navigate("/consultorios")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Consultorios</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="/images/emergencia.png"
                  alt="Emergencia"
                  onClick={() => navigate("/emergencia")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Emergencia</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="/images/cardiovascular.png"
                  alt="Cardiovascular"
                  onClick={() => navigate("/instituto-cardiovascular")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Instituto Cardiovascular</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="/images/laboratorio.png"
                  alt="Laboratorio"
                  onClick={() => navigate("/laboratorio")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Laboratorio</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="/images/imagen.png"
                  alt="Imagen Médica"
                  onClick={() => navigate("/imagen-medica")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Imagen Médica</p>
              </div>
              <div className="col-md-4 text-center">
                <img
                  src="/images/endoscopia.png"
                  alt="Endoscopía"
                  onClick={() => navigate("/endoscopia")} // Redirigir al hacer clic en la imagen
                  style={{ cursor: "pointer" }}
                />
                <p>Endoscopía</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Estilos en línea para los botones con fondo blanco y borde redondeado
const styles = {
  button: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '200px',
    textAlign: 'center',
  },
  icon: {
    fontSize: '40px',
    color: '#007bff',
  },
};

export default HomePage;
