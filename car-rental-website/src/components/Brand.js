import logo from "../assets/logo.png";

export default function Brand() {
  return (
    <div className="brand">
      <img src={logo} alt="Ulan Car Rental Logo" className="brand-logo" />
      <span className="brand-name">Ulan Car Rental</span>
    </div>
  );
}