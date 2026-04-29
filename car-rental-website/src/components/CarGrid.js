import React from "react";
import PropTypes from "prop-types";
import CarCard from "./CarCard";

export default function CarGrid({ cars, onBook, onEdit, onDelete }) {
  return (
    <div className="grid">
      {cars.map((car) => (
        <CarCard
          key={car.id}
          car={car}
          onBook={onBook}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

CarGrid.propTypes = {
  cars: PropTypes.arrayOf(PropTypes.object).isRequired,
  onBook: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
