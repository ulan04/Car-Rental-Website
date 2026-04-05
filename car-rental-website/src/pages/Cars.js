import { useNavigate, useOutletContext } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import CarGrid from "../components/CarGrid";

export default function Cars(props) {
  const navigate = useNavigate();
  const context = useOutletContext();

  const cars = context?.cars ?? props.cars ?? [];
  const onDelete = context?.onDelete ?? props.onDelete;

  const addBtn = (
    <button className="btn primary" onClick={() => navigate("/cars/new")}>
      + Add Car
    </button>
  );

  function handleBook(car) {
    navigate("/booking", { state: car });
  }

  function handleEdit(id) {
    navigate(`/cars/${id}/edit`);
  }
  
  function handleDelete(car) {
    if (!onDelete) return alert("Delete function is not connected.");
    const ok = window.confirm(`Are you sure you want to delete "${car.name}"?`);
    if (ok) onDelete(car.id);
  }

  return (
    <div className="container">
      <PageTitle title="Available Cars" right={addBtn} />

      <CarGrid
        cars={cars}
        onBook={handleBook}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
