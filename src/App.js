// import { Routes, Route } from "react-router-dom";
// import Navbar from "./Components/Navbar";
// import Donation from "./Components/Donation";
// import Footer from "./Components/Footer";

// // Importe tes autres pages ici
// import Home from "./pages/Home";
// import Associations from "./pages/Associations";
// import Events from "./pages/Events";

// export default function App() {
//   return (
//     <>
//       <Navbar />
//       {/* padding-top pour compenser la navbar fixed */}
//       <div style={{ paddingTop: "72px" }}>
//         <Routes>
//           <Route path="/" element={<Home />} /> 
//           <Route path="/associations" element={<Associations />} /> 
//           <Route path="/events" element={<Events />} />
//           <Route path="/donation" element={<Donation />} />
//         </Routes>
//       </div>
//       <Footer />
//     </>
//   );
// }
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Donation from "./Components/Donation";
import Footer from "./Components/Footer";


import Home from "./pages/Home";
import Associations from "./pages/Associations";
import Events from "./pages/Events";


import Login from "./pages/Login";
import Register from "./pages/Register";
import VolunteerProfile from "./pages/VolunteerProfile";
import AdminOverview from "./pages/AdminOverview";

export default function App() {
  return (
    <>
      <Navbar />

      {/* padding-top pour compenser la navbar fixed */}
      <div style={{ paddingTop: "72px" }}>
        <Routes>
          {/* Existing routes */}
          <Route path="/" element={<Home />} />
          <Route path="/associations" element={<Associations />} />
          <Route path="/events" element={<Events />} />
          <Route path="/donation" element={<Donation />} />

          {/* Footer routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/volunteer/profile" element={<VolunteerProfile />} />
          <Route path="/admin/overview" element={<AdminOverview />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}