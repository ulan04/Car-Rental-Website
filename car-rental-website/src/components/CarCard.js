export default function CarCard({ car, onBook, onEdit, onDelete }) {
  return (
    <div className="card">
      <div className="card-title">
        <h3>{car.name}</h3>
        <span className="tag">{car.type}</span>
      </div>

      <ul className="card-list">
        <li><strong>Price per day:</strong> {car.pricePerDay} KZT</li>
        <li><strong>Seats:</strong> {car.seats}</li>
        <li><strong>Transmission:</strong> {car.transmission}</li>
      </ul>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button className="btn" onClick={() => onBook(car)}>Book</button>
        <button className="btn" onClick={() => onEdit(car.id)}>Edit</button>

        <button
          className="btn"
          onClick={() => onDelete(car)}
          style={{ border: "1px solid #ff4d4f", color: "#ff4d4f", background: "transparent" }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}