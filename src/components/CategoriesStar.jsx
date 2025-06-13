import React, { useState } from "react";
import CharacterStar from "./CharacterStar";
import VehiclesStar from "./VehiclesStar";
import PlanetsStar from "./PlanetsStar";
import portadaImage from "../assets/img/ImagenStarWars.jpg";

const CategoriesStar = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="container mt-2 mb-5 p-4 rounded bg-black">
      <div className="row align-items-start">
        {/* Botones */}
        <div className="col-md-3">
          <div className="d-grid gap-4">
            <button
              className="btn btn-warning mb-3 w-100 btn-lg"
              onClick={() => setSelectedCategory("Personajes")}
            >
              Personajes 🤖
            </button>
            <button
              className="btn btn-warning mb-3 w-100 btn-lg"
              onClick={() => setSelectedCategory("Vehículos")}
            >
              Vehículos 🚀
            </button>
            <button
              className="btn btn-warning w-100 btn-lg"
              onClick={() => setSelectedCategory("Planetas")}
            >
              Planetas 🪐
            </button>
          </div>
        </div>

        {/* Imagen o contenido */}
        <div
          className="col-md-9 text-center text-white d-flex align-items-start justify-content-center"
          style={{ minHeight: "500px" }}
        >
          {!selectedCategory && (
            <img
              src={portadaImage}
              alt="Portada Star Wars"
              className="img-fluid rounded shadow"
              style={{
                maxWidth: "100%",
                maxHeight: "600px", // más grande
                objectFit: "contain",
                marginTop: "0px",   // más arriba
              }}
            />
          )}

          {selectedCategory === "Personajes" && <CharacterStar />}
          {selectedCategory === "Vehículos" && <VehiclesStar />}
          {selectedCategory === "Planetas" && <PlanetsStar />}
        </div>
      </div>
    </div>
  );
};

export default CategoriesStar;
