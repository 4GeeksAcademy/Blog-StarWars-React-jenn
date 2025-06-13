import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importamos Link para navegación
import useGlobalReducer from "../hooks/useGlobalReducer";
import characterImage from "../assets/img/Chewbacca.png"; // Imagen local

const CharacterStar = () => {
    const [items, setItems] = useState([]);
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const res = await fetch("https://www.swapi.tech/api/people");
                const data = await res.json();
                if (data.results) {
                    setItems(data.results.slice(0, 10));
                } else {
                    console.error("No se encontraron personajes.");
                    setItems([]);
                }
            } catch (error) {
                console.error("Error al obtener personajes:", error);
            }
        };
        fetchCharacters();
    }, []);

    const toggleFavorite = (item) => {
        dispatch({
            type: "toggle_favorite",
            payload: {
                name: item.name,
                uid: item.url.split("/").pop(),
                type: "character"
            }
        });
    };

    const isFavorite = (uid) => {
        return store.favorites.some((fav) => fav.uid === uid);
    };

    return (
        <div className="row">
            {items.map((item) => {
                const uid = item.url.split("/").pop(); // Extrae ID

                return (
                    <div className="col-md-4 mb-4" key={uid}>
                        <div className="card h-500">
                            <img src={characterImage} className="card-img-top" alt={item.name} />

                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <p className="card-text">Personaje Star Wars</p>

                                {/* boton para pagina Ver mas */}
                                <Link to={`/single/character/${uid}`} className="btn btn-warning btn-sm">
                                    Ver más
                                </Link>

                                <button
                                    className="btn btn-warning btn-sm ms-2"
                                    onClick={() => toggleFavorite(item)}
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

export default CharacterStar;
