import React, { useEffect, useReducer, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSpinner from "../components/LoadingSpinner";
import { useToast } from "../components/ToastContext";

const initialState = {
  name: "",
  type: "",
  pricePerDay: "",
  seats: "",
  transmission: "",
  image: "",
};

function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_FORM":
      return action.payload;
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const validators = {
  name: (value) => (!value.trim() ? "Car name is required" : ""),
  type: (value) => (!value.trim() ? "Car type is required" : ""),
  pricePerDay: (value) => {
    const num = Number(value);
    if (!value) return "Price is required";
    if (!Number.isFinite(num) || num <= 0) return "Must be positive";
    return "";
  },
  seats: (value) => {
    const num = Number(value);
    if (!value) return "Seats required";
    if (num <= 0 || num > 20) return "1–20 only";
    return "";
  },
  transmission: (value) =>
    !value.trim() ? "Transmission required" : "",
  image: (value) => (!value ? "Image required" : ""),
};

function compressImage(file, maxWidth = 600, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const scale = maxWidth / img.width;

        canvas.width = img.width > maxWidth ? maxWidth : img.width;
        canvas.height =
          img.width > maxWidth ? img.height * scale : img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        resolve(canvas.toDataURL("image/jpeg", quality));
      };

      img.onerror = () => reject();
    };

    reader.readAsDataURL(file);
  });
}

export default function CarForm({ mode, onSubmit, getCarById }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const context = useOutletContext();
  const { error: showError, success: showSuccess } = useToast();

  const addCar = context?.addCar || onSubmit;
  const updateCar = context?.updateCar || onSubmit;
  const fetchCar = context?.getCarById || getCarById;

  const [form, dispatch] = useReducer(formReducer, initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (mode !== "edit") return;

    const car = fetchCar?.(id);
    if (!car) return setNotFound(true);

    dispatch({
      type: "SET_FORM",
      payload: {
        name: car.name,
        type: car.type,
        pricePerDay: String(car.pricePerDay),
        seats: String(car.seats),
        transmission: car.transmission,
        image: car.image || "",
      },
    });
  }, [mode, id, fetchCar]);

  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: "SET_FIELD", field: name, value });
    setErrors((p) => ({ ...p, [name]: validators[name]?.(value) }));
  }

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const img = await compressImage(file);
      dispatch({ type: "SET_FIELD", field: "image", value: img });
      setErrors((p) => ({ ...p, image: "" }));
    } catch {
      setErrors((p) => ({ ...p, image: "Upload failed" }));
    }
  }

  function validateForm() {
    const newErrors = {};
    Object.keys(form).forEach((k) => {
      const err = validators[k]?.(form[k]);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return showError("Fix errors");

    setIsLoading(true);

    try {
      const payload = {
        name: form.name.trim(),
        type: form.type.trim(),
        pricePerDay: Number(form.pricePerDay),
        seats: Number(form.seats),
        transmission: form.transmission.trim(),
        image: form.image,
      };

      if (mode === "create") {
        await addCar(payload);
        showSuccess("Added!");
      } else {
        await updateCar(id, payload);
        showSuccess("Updated!");
      }

      navigate("/cars");
    } catch (err) {
      showError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  if (mode === "edit" && notFound) {
    return <div className="container">Car not found</div>;
  }

  return (
    <div className="container">
      <h2>{mode === "create" ? "Add Car" : "Edit Car"}</h2>

      {isLoading && <LoadingSpinner message="Saving..." />}

      {/* 卡片布局 */}
      <div className="form-card">
        <form className="form" onSubmit={handleSubmit} noValidate>

          <div className="form-grid">
            <div>
              <label>Name</label>
              <input name="name" value={form.name} onChange={handleChange} />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div>
              <label>Type</label>
              <input name="type" value={form.type} onChange={handleChange} />
              {errors.type && <span className="form-error">{errors.type}</span>}
            </div>

            <div>
              <label>Price</label>
              <input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} />
              {errors.pricePerDay && <span className="form-error">{errors.pricePerDay}</span>}
            </div>

            <div>
              <label>Seats</label>
              <input name="seats" type="number" value={form.seats} onChange={handleChange} />
              {errors.seats && <span className="form-error">{errors.seats}</span>}
            </div>

            <div>
              <label>Transmission</label>
              <input name="transmission" value={form.transmission} onChange={handleChange} />
              {errors.transmission && <span className="form-error">{errors.transmission}</span>}
            </div>

            <div>
              <label>Image</label>
              <input type="file" onChange={handleImageChange} />
              {errors.image && <span className="form-error">{errors.image}</span>}
            </div>
          </div>

          {form.image && (
            <img src={form.image} alt="preview" className="form-preview-img" />
          )}

          <div className="form-actions">
            <button className="btn primary">
              {mode === "create" ? "Add" : "Save"}
            </button>
            <button type="button" className="btn" onClick={() => navigate("/cars")}>
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

CarForm.propTypes = {
  mode: PropTypes.oneOf(["create", "edit"]),
  onSubmit: PropTypes.func,
  getCarById: PropTypes.func,
};