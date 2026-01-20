import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Home.jsx";
import About from "./About.jsx";
import Contact from "./Contact.jsx";

export default function SinglePageApp() {
  return (
    <BrowserRouter>

      <nav style={{ padding: "15px", background: "#1976d2" }}>
        <Link style={{ color: "white", marginRight: "15px" }} to="/">Home</Link>
        <Link style={{ color: "white", marginRight: "15px" }} to="/about">About</Link>
        <Link style={{ color: "white" }} to="/contact">Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

    </BrowserRouter>
  );
}
