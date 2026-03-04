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