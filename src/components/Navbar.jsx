import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container d-flex align-items-center">
        {/* Logo siempre visible */}
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg"
            alt="Star Wars Logo"
            style={{ width: "140px", marginRight: "30px" }}
          />
        </Link>

        {/* Botones alineados a la derecha */}
        <div className="ms-auto d-flex align-items-center gap-3">
          {/* Mostrar botón Inicio si NO estamos en la página principal */}
          {location.pathname !== "/" && (
            <Link to="/">
              <button className="btn btn-warning">🌑 Inicio</button>
            </Link>
          )}

          {/* Botón Favoritos siempre visible */}
          <Link to="/demo">
            <button className="btn btn-warning">🖤 Favoritos</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
