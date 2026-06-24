import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Donation from "./Components/Donation";
import Footer from "./Components/Footer";

// Importe tes autres pages ici
import Home from "./pages/Home";
import Associations from "./pages/Associations";
import Events from "./pages/Events";

export default function App() {
  return (
    <>
      <Navbar />
      {/* padding-top pour compenser la navbar fixed */}
      <div style={{ paddingTop: "100px", minHeight: "calc(100vh - 64px)" }}>        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/associations" element={<Associations />} /> 
          <Route path="/events" element={<Events />} />
          <Route path="/donation" element={<Donation />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}