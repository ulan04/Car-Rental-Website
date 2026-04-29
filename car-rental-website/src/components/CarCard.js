import React from "react";
import PropTypes from "prop-types";

export default function CarCard({ car, onBook, onEdit, onDelete }) {
  return (
    <div className="card">
      <img src={car.image} alt={car.name} className="car-card-img" />

      <div className="card-body">
        <div className="card-title">
          <h3>{car.name}</h3>
          <span className="tag">{car.type}</span>
        </div>

        <ul className="card-list">
          <li><strong>Price per day:</strong> {car.pricePerDay.toLocaleString()} KZT</li>
          <li><strong>Seats:</strong> {car.seats}</li>
          <li><strong>Transmission:</strong> {car.transmission}</li>
        </ul>

        <div className="card-actions">
          <button className="btn primary" onClick={() => onBook(car)}>
            Book Now
          </button>

          <button className="btn" onClick={() => onEdit(car.id)}>
            Edit
          </button>

          <button
            className="btn danger"
            onClick={() => onDelete(car.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    pricePerDay: PropTypes.number.isRequired,
    seats: PropTypes.number.isRequired,
    transmission: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
  onBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
