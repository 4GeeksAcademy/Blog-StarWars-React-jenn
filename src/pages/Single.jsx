import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import chewbaccaImg from "../assets/img/Chewbacca.png"; // Imagen para personajes
import planetImage from "../assets/img/planets.jpg";     // Imagen genérica para planetas
import vehicleImage from "../assets/img/vehicles.jpg";   // Imagen genérica para vehículos

const Single = () => {
  const { type, uid } = useParams(); // Obtenemos los parámetros de la URL
  const [details, setDetails] = useState(null); // Estado para almacenar detalles

  useEffect(() => {
    // Determina correctamente el endpoint basado en el tipo
    const apiType =
      type === "character"
        ? "people"
        : type === "planet"
        ? "planets"
        : type === "vehicle"
        ? "vehicles"
        : type;

    const fetchDetails = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${apiType}/${uid}/`);

        // Verifica que la respuesta sea JSON
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("La respuesta no es JSON");
        }

        const data = await res.json();

        if (data.result) {
          setDetails(data.result); // Guardamos el objeto completo
        } else {
          console.error("No se encontraron detalles.");
        }
      } catch (error) {
        console.error("Error al obtener detalles:", error);
      }
    };

    fetchDetails();
  }, [type, uid]);

  return (
    <div className="container mt-5 text-center">
      {details ? (
        <>
          <h1 className="mb-3">{details.properties.name}</h1>

          {/*  Mostrar imagen dependiendo del tipo */}
          {type === "character" ? (
            <img
              src={chewbaccaImg}
              alt={details.properties.name}
              className="img-fluid mb-4"
              style={{ maxHeight: "400px" }}
            />
          ) : type === "planet" ? (
            <img
              src={planetImage}
              alt={details.properties.name}
              className="img-fluid mb-4"
              style={{ maxHeight: "400px" }}
            />
          ) : type === "vehicle" ? (
            <img
              src={vehicleImage}
              alt={details.properties.name}
              className="img-fluid mb-4"
              style={{ maxHeight: "400px" }}
            />
          ) : (
            <img
              src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
              alt="Imagen no disponible"
              className="img-fluid mb-4"
              style={{ maxHeight: "400px" }}
            />
          )}

          {/*  Descripción si está disponible */}
          <p>
            <strong>Descripción:</strong>{" "}
            {details.description || "Sin descripción disponible."}
          </p>

          {/*  Mostrar propiedades dinámicamente */}
          <div className="text-start mt-4">
            {Object.entries(details.properties).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}
          </div>

          <Link to="/" className="btn btn-warning mt-4">
            ⬅ Volver al inicio
          </Link>
        </>
      ) : (
        <p>Cargando detalles...</p>
      )}
    </div>
  );
};

export default Single;
