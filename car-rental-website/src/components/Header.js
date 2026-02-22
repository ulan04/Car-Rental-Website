import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-row">
        <div className="brand">
          <img src={logo} alt="Ulan Car Rental Logo" className="brand-logo" />
          <span className="brand-name">Ulan Car Rental</span>
        </div>

        <nav className="nav">
          <Link to="/cars">Cars</Link>
          <Link to="/booking">Booking</Link>
        </nav>
      </div>
    </header>
  );
}