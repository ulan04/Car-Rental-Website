import { Link } from "react-router-dom";

export default function NavLinks() {
  return (
    <nav className="nav">
      <Link to="/cars">Cars</Link>
      <Link to="/booking">Booking</Link>
    </nav>
  );
}