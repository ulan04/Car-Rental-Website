import { useNavigate } from "react-router-dom";

export default function Cars({ cars, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h2>Available Cars</h2>
        <button className="btn primary" onClick={() => navigate("/cars/new")}>
          + Add Car
        </button>
      </div>

      <div className="grid">
        {cars.map((car) => (
          <div className="card" key={car.id}>
            <div className="card-title">
              <h3>{car.name}</h3>
              <span className="tag">{car.type}</span>
            </div>

            <ul className="card-list">
              <li>
                <strong>Price per day:</strong> {car.pricePerDay} KZT
              </li>
              <li>
                <strong>Seats:</strong> {car.seats}
              </li>
              <li>
                <strong>Transmission:</strong> {car.transmission}
              </li>
            </ul>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                className="btn"
                onClick={() => navigate("/booking", { state: car })}
              >
                Book
              </button>

              <button
                className="btn"
                onClick={() => navigate(`/cars/${car.id}/edit`)}
              >
                Edit
              </button>

              <button
                className="btn"
                onClick={() => {
                  if (!onDelete) {
                    alert("Delete function is not connected (onDelete is missing).");
                    return;
                  }

                  const ok = window.confirm(
                    `Are you sure you want to delete "${car.name}"?`
                  );
                  if (ok) onDelete(car.id);
                }}
                style={{
                  border: "1px solid #ff4d4f",
                  color: "#ff4d4f",
                  background: "transparent",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}