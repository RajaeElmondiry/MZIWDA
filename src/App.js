import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Donation from "./Components/Donation";
import Footer from "./Components/Footer";
import AuthPage from "./pages/AuthPage";

// Importe tes autres pages ici
import Home from "./pages/Home";
import Associations from "./pages/Associations";
import Events from "./pages/Events";

export default function App() {
  return (
    <>
      <Navbar />
      {/* padding-top pour compenser la navbar fixed */}
      <div style={{ paddingTop: "72px" }}>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/associations" element={<Associations />} /> 
          <Route path="/events" element={<Events />} />
          <Route path="/donation" element={<Donation />} />
          <Route path="/login" element={<AuthPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}