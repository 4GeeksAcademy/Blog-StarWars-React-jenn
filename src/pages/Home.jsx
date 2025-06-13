//pagina principal

import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import CategoriesStar from "../components/CategoriesStar.jsx"; //importamos los botones de categorias

export const Home = () => {

  const {store, dispatch} =useGlobalReducer()

	return (
		<div className="text-center mt-5">

			{/* aqui vamos a colocar el componente CategoriesStar */}
			{/*  para que se muestren los botones en la pantalla principal */}
			<CategoriesStar />

		</div>
	);
}; 
