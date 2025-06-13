// Importamos los componentes necesarios de React Router y nuestro hook global
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; // Hook global para acceder al store y dispatch

export const Demo = () => {
  // Obtenemos el estado global y la función dispatch
  const { store, dispatch } = useGlobalReducer();

  //  Esta función obtiene la URL de la imagen según el tipo y UID del favorito
  const getImageUrl = (type, uid) => {
    switch (type) {
      case "character":
        return `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
      case "planet":
        return `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
      case "vehicle":
        return `https://starwars-visualguide.com/assets/img/vehicles/${uid}.jpg`;
      default:
        return "https://starwars-visualguide.com/assets/img/placeholder.jpg";
    }
  };

  //  Función para eliminar un favorito (reutiliza la misma acción toggle)
  const removeFavorite = (fav) => {
    dispatch({
      type: "toggle_favorite",
      payload: fav,
    });
  };

  return (
    <div className="container">
      {/* Lista de tareas de ejemplo (original del boilerplate) */}
      <ul className="list-group mb-5">
        {store && store.todos?.map((item) => (
          <li
            key={item.id}
            className="list-group-item d-flex justify-content-between"
            style={{ background: item.background }}
          >
            {/* Link a la vista de detalle del todo */}
            <Link to={"/single/" + item.id}>Link to: {item.title}</Link>

            <p className="mb-0">Open file ./store.js to see the global store that contains and updates the list of colors</p>

            {/* Botón para cambiar el color de fondo del todo */}
            <button
              className="btn btn-success"
              onClick={() =>
                dispatch({
                  type: "add_task",
                  payload: { id: item.id, color: "#ffa500" },
                })
              }
            >
              Change Color
            </button>
          </li>
        ))}
      </ul>

      {/* Favoritos guardados por el usuario */}
      <h3 className="mb-3">🖤 Tus Favoritos</h3>

      <div className="row">
        {store.favorites.length === 0 && (
          <p className="text-muted">No tienes favoritos aún.</p>
        )}

        {/* Renderizamos cada favorito */}
        {store.favorites.map((fav) => (
          <div className="col-md-4 mb-4" key={`${fav.type}-${fav.uid}`}>
            <div className="card h-100">
              {/* Imagen del favorito, con fallback por categoría si falla */}
              <img
                src={getImageUrl(fav.type, fav.uid)}
                className="card-img-top"
                alt={fav.name}
                onError={(e) => {
                  // Imagen alternativa por categoría
                  const fallbackImages = {
                    character: "https://starwars-visualguide.com/assets/img/characters/1.jpg",
                    planet: "https://starwars-visualguide.com/assets/img/planets/1.jpg",
                    vehicle: "https://starwars-visualguide.com/assets/img/vehicles/4.jpg",
                  };
                  e.target.src = fallbackImages[fav.type] || "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                }}
              />

              {/* Cuerpo de la tarjeta con info */}
              <div className="card-body">
                <h5 className="card-title">{fav.name}</h5>
                <p className="card-text text-capitalize">Tipo: {fav.type}</p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => removeFavorite(fav)}
                >
                  Quitar de favoritos
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botón para volver al home */}
      <div className="mt-4">
        <Link to="/">
          <button className="btn btn-primary">Back home</button>
        </Link>
      </div>
    </div>
  );
};
