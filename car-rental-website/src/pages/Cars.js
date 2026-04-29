import React, { useState, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import CarGrid from "../components/CarGrid";
import LoadingSpinner from "../components/LoadingSpinner";
import useDebounce from "../hooks/useDebounce";
import { useLanguage } from "../components/LanguageContext";
import { useToast } from "../components/ToastContext";

export default function Cars() {
  const navigate = useNavigate();
  const { cars, onDelete } = useOutletContext();
  const { t } = useLanguage();
  const { warning } = useToast();

  const [search, setSearch] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const debouncedSearch = useDebounce(search, 300);

  const filteredCars = useMemo(() => {
    const term = debouncedSearch.toLowerCase();
    return cars.filter(
      (car) =>
        car.name.toLowerCase().includes(term) ||
        car.type.toLowerCase().includes(term)
    );
  }, [cars, debouncedSearch]);

  const addButton = (
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

  async function handleDelete(id) {
    const ok = window.confirm("Are you sure you want to delete this car? This action cannot be undone.");
    if (!ok) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(id);
      warning("Car deleted successfully");
    } catch (error) {
      warning("Failed to delete car", "error");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="container">
      <PageTitle title="Available Cars" right={addButton} />

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder={t("searchPlaceholder")}
          className="login-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search cars"
        />
      </div>

      {isDeleting && <LoadingSpinner message="Deleting car..." />}

      {filteredCars.length > 0 ? (
        <CarGrid
          cars={filteredCars}
          onBook={handleBook}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : debouncedSearch ? (
        <div className="empty-state">
          <h3>No cars found</h3>
          <p>Try searching for another model or clear your search.</p>
        </div>
      ) : (
        <div className="empty-state">
          <h3>No cars available</h3>
          <p>Add a new car to get started.</p>
        </div>
      )}
    </div>
  );
}