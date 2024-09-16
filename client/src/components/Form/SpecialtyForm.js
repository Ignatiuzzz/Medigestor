import React from "react";

const SpecialtyForm = ({ handleSubmit, name, setName, description, setDescription }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ingresar nombre de la especialidad"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            placeholder="Ingresar descripción de la especialidad"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Subir
        </button>
      </form>
    </>
  );
};

export default SpecialtyForm;
