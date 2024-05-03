import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { DefaultLayout } from "./layout/Layout";
import MainMenu from "./pages/MainMenu";
import ServicePage from "./pages/ServicePage";
import ServiceDescPage from "./pages/ServiceDescPage";

export default function App() {
  return (

    // Esse AnimatePresence do Framer Motion com o mode="wait" permite uma transição fluida entra as paginas
    <AnimatePresence mode="wait"> 
    <Router>
      <Routes>
        {/* Aqui estou utilizando um Layout que esta na pasta de layouts, ele comporta tanto o header quanto o footer */}
        <Route element={<DefaultLayout />}> 
          <Route path="/" element={<MainMenu />} />
          <Route path="/service/:itemId" element={<ServicePage />} />
          <Route path="/servicedesc/:itemId/:subModuloId" element={<ServiceDescPage />} />
        </Route>
      </Routes>
    </Router>
    </AnimatePresence>
  );
}
