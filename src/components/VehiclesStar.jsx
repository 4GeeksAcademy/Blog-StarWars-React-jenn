import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ necesario para navegación
import useGlobalReducer from "../hooks/useGlobalReducer";
import vehicleImage from "../assets/img/vehicles.jpg"; // Imagen local genérica

const VehiclesStar = () => {
    const [items, setItems] = useState([]);
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const fetchVehicles = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/vehicles");
                const data = await res.json();

                if (data.results) {
                    setItems(data.results.slice(0, 10));
                } else {
                    console.error("No se encontraron vehículos.");
                    setItems([]);
                }
            } catch (error) {
                console.error("Error al obtener vehículos:", error);
            }
        };

        fetchVehicles();
    }, []);

    const toggleFavorite = (item) => {
        dispatch({
            type: "toggle_favorite",
            payload: {
                name: item.name,
                uid: item.url.split("/").pop(),
                type: "vehicle"
            }
        });
    };

    const isFavorite = (uid) => {
        return store.favorites.some((fav) => fav.uid === uid);
    };

    return (
        <div className="row">
            {items.map((item) => {
                const uid = item.url.split("/").pop();

                return (
                    <div className="col-md-4 mb-4" key={uid}>
                        <div className="card h-100">
                            <img src={vehicleImage} className="card-img-top" alt={item.name} />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Vehículo Star Wars</p>

                                {/* Boton de Ver mas */}
                                <Link to={`/single/vehicle/${uid}`} className="btn btn-warning btn-sm">
                                    Ver más
                                </Link>

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

export default VehiclesStar;
