import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const InputDeBusqueda = () => {
  const [valores, setValores] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${valores.palabraClave}`
      );
      setValores({ ...valores, resultados: data });
      navigate("/busqueda");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form
        className="d-flex formulario-de-busqueda"
        role="buscar"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Buscar"
          aria-label="Buscar"
          value={valores.palabraClave}
          onChange={(e) => setValores({ ...valores, palabraClave: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Buscar
        </button>
      </form>
    </div>
  );
};

export default InputDeBusqueda;
