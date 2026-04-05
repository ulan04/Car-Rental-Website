import { useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

const empty = {
  name: "",
  type: "",
  pricePerDay: "",
  seats: "",
  transmission: "",
};

export default function CarForm({ mode, onSubmit, getCarById }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useOutletContext();

  const addCar = context && context.addCar ? context.addCar : onSubmit;
  const updateCar = context && context.updateCar ? context.updateCar : onSubmit;
  const fetchCar = context && context.getCarById ? context.getCarById : getCarById;

  const [form, setForm] = useState(empty);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (mode !== "edit") return;

    const car = fetchCar ? fetchCar(id) : null;
    if (!car) {
      setNotFound(true);
      return;
    }

    setForm({
      name: car.name,
      type: car.type,
      pricePerDay: String(car.pricePerDay),
      seats: String(car.seats),
      transmission: car.transmission,
    });
  }, [mode, id, fetchCar]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const price = Number(form.pricePerDay);
    const seats = Number(form.seats);
    if (!Number.isFinite(price) || price <= 0) {
      alert("Price must be a positive number.");
      return;
    }
    if (!Number.isFinite(seats) || seats <= 0) {
      alert("Seats must be a positive number.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      type: form.type.trim(),
      pricePerDay: price,
      seats: seats,
      transmission: form.transmission.trim(),
    };

    if (!payload.name || !payload.type || !payload.transmission) {
      alert("Please fill in all fields.");
      return;
    }

    if (mode === "create") {
      if (!addCar) {
        alert("Add handler is not connected.");
        return;
      }
      addCar(payload);
    } else {
      if (!updateCar) {
        alert("Update handler is not connected.");
        return;
      }
      updateCar(id, payload);
    }

    navigate("/cars");
  }

  if (mode === "edit" && notFound) {
    return (
      <div className="container">
        <h2>Car not found</h2>
        <button className="btn" onClick={() => navigate("/cars")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{mode === "create" ? "Add New Car" : "Edit Car"}</h2>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>
            Car Name
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g., Toyota Camry" required />
          </label>

          <label>
            Type
            <input name="type" value={form.type} onChange={handleChange} placeholder="Sedan / SUV / Minivan" required />
          </label>
        </div>

        <div className="form-row">
          <label>
            Price per day (KZT)
            <input
              name="pricePerDay"
              value={form.pricePerDay}
              onChange={handleChange}
              placeholder="e.g., 20000"
              required
            />
          </label>

          <label>
            Seats
            <input name="seats" value={form.seats} onChange={handleChange} placeholder="e.g., 5" required />
          </label>
        </div>

        <label>
          Transmission
          <input
            name="transmission"
            value={form.transmission}
            onChange={handleChange}
            placeholder="Automatic / Manual"
            required
          />
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn primary" type="submit">
            {mode === "create" ? "Add Car" : "Save Changes"}
          </button>
          <button className="btn" type="button" onClick={() => navigate("/cars")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
