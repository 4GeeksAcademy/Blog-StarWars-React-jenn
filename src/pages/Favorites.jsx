
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import characterImg from "../assets/img/Chewbacca.png";
import planetImg from "../assets/img/planets.jpg";
import vehicleImg from "../assets/img/vehicles.jpg";

// Componente para mostrar favoritos con imágenes genéricas
const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();

    // Imagen según tipo de favorito
    const getImageByType = (type) => {
        switch (type) {
            case "character":
                return characterImg;
            case "planet":
                return planetImg;
            case "vehicle":
                return vehicleImg;
            default:
                return "";
        }
    };

    // Quitar favorito
    const removeFavorite = (item) => {
        dispatch({
            type: "toggle_favorite",
            payload: {
                name: item.name,
                uid: item.uid,
                type: item.type
            }
        });
    };

    return (
        <div className="container mt-4">
            <h2>Mis Favoritos</h2>
            <div className="row">
                {store.favorites.length === 0 ? (
                    <div className="col-12">
                        <p>No tienes favoritos aún.</p>
                    </div>
                ) : (
                    store.favorites.map((item) => (
                        <div className="col-md-4 mb-4" key={`${item.uid}-${item.type}`}>
                            <div className="card h-100">
                                <img
                                    src={getImageByType(item.type)}
                                    className="card-img-top"
                                    alt={item.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">Tipo: {item.type}</p>
                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() => removeFavorite(item)}
                                        title="Quitar de favoritos"
                                    >
                                        🗑️ Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Favorites;
