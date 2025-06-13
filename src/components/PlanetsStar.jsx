// PlanetsStar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import planetImage from "../assets/img/planets.jpg"; // Imagen genérica

const PlanetsStar = () => {
    const [items, setItems] = useState([]);
    const { store, dispatch } = useGlobalReducer();

    // 🛰️ Traemos los primeros 10 planetas al montar el componente
    useEffect(() => {
        const fetchPlanets = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/planets");
                const data = await res.json();

                if (data.results) {
                    setItems(data.results.slice(0, 10)); // Mostramos solo 10 planetas
                } else {
                    console.error("No se encontraron planetas.");
                    setItems([]);
                }
            } catch (error) {
                console.error("Error al obtener planetas:", error);
            }
        };

        fetchPlanets();
    }, []);

    //  Agrega o quita de favoritos
    const toggleFavorite = (item) => {
        dispatch({
            type: "toggle_favorite",
            payload: {
                name: item.name,
                uid: item.url.replace(/\/$/, "").split("/").pop(), // Extrae el UID
                type: "planet"
            }
        });
    };

    //  Verifica si está en favoritos
    const isFavorite = (uid) => {
        return store.favorites.some((fav) => fav.uid === uid);
    };

    return (
        <div className="row">
            {items.map((item) => {
                const uid = item.url.replace(/\/$/, "").split("/").pop(); // Extrae UID del URL

                return (
                    <div className="col-md-4 mb-4" key={uid}>
                        <div className="card h-500">
                            {/* Imagen genérica de planeta */}
                            <img src={planetImage} className="card-img-top" alt={item.name} />

                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Planeta Star Wars</p>

                                {/*  Botón para ir a la vista de detalles */}
                                <Link to={`/single/planet/${uid}`} className="btn btn-warning btn-sm">
                                    Ver más
                                </Link>

                                {/*  Botón de favoritos */}
                                <button
                                    className="btn btn-warning btn-sm ms-2"
                                    onClick={() => toggleFavorite(item)}
                                    title="Agregar a favoritos"
                                >
                                    {isFavorite(uid) ? "🖤" : "🤍"}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PlanetsStar;
