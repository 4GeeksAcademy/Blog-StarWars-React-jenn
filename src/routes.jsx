import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import Single from "./pages/Single";
import Favorites from "./pages/Favorites";

//  IMPORTS 
import PlanetsStar from "./components/PlanetsStar";
import CharacterStar from "./components/CharacterStar";
import VehiclesStar from "./components/VehiclesStar";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} >
            <Route index element={<Home />} />
            <Route path="demo" element={<Favorites />} />
            <Route path="single/:type/:uid" element={<Single />} />

            {/* NUEVAS RUTAS */}
            <Route path="planets" element={<PlanetsStar />} />
            <Route path="characters" element={<CharacterStar />} />
            <Route path="vehicles" element={<VehiclesStar />} />
        </Route>
    )
);
