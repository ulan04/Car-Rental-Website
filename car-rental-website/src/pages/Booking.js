import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { useToast } from "../components/ToastContext";

const validators = {
  fullName: (value) => {
    if (!value.trim()) return "Full name is required";
    if (value.trim().length < 2) return "Full name must be at least 2 characters";
    return "";
  },
  phone: (value) => {
    if (!value.trim()) return "Phone number is required";
    if (!/^[\d\s+\-()]+$/.test(value)) return "Please enter a valid phone number";
    return "";
  },
  pickupDate: (value) => {
    if (!value) return "Pickup date is required";
    return "";
  },
  returnDate: (value, pickupDate) => {
    if (!value) return "Return date is required";
    if (new Date(value) <= new Date(pickupDate)) {
      return "Return date must be after pickup date";
    }
    return "";
  },
  pickupLocation: (value) => {
    if (!value.trim()) return "Pickup location is required";
    if (value.trim().length < 2) return "Location must be at least 2 characters";
    return "";
  },
};

const initialForm = {
  fullName: "",
  phone: "",
  pickupDate: "",
  returnDate: "",
  pickupLocation: "",
};

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { success: showSuccess, error: showError } = useToast();

  const selectedCar = location.state;
  const isFromMenu = !selectedCar;

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem("car_rental_bookings");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("car_rental_bookings", JSON.stringify(bookings));
  }, [bookings]);

  const bookingSummary = useMemo(() => {
    if (!form.pickupDate || !form.returnDate) {
      return { days: 0, total: 0 };
    }

    const start = new Date(form.pickupDate);
    const end = new Date(form.returnDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

    const days = diffDays > 0 ? diffDays : 0;
    const total = days * (selectedCar?.pricePerDay || 0);

    return { days, total };
  }, [form.pickupDate, form.returnDate, selectedCar]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    const error =
      name === "returnDate"
        ? validators.returnDate(value, form.pickupDate)
        : validators[name]?.(value) || "";

    setErrors((prev) => ({ ...prev, [name]: error }));
  }

  function validateForm() {
    const newErrors = {};

    Object.keys(form).forEach((key) => {
      const error =
        key === "returnDate"
          ? validators.returnDate(form.returnDate, form.pickupDate)
          : validators[key]?.(form[key]) || "";

      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!selectedCar) {
      showError("Please select a car first");
      return;
    }

    if (!validateForm()) {
      showError("Please fix all errors before submitting");
      return;
    }

    if (bookingSummary.days <= 0) {
      showError("Return date must be at least one day after pickup date");
      return;
    }

    const newBooking = {
      id: crypto.randomUUID(),
      carName: selectedCar.name,
      carType: selectedCar.type,
      carImage: selectedCar.image,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      pickupDate: form.pickupDate,
      returnDate: form.returnDate,
      pickupLocation: form.pickupLocation.trim(),
      days: bookingSummary.days,
      total: bookingSummary.total,
    };

    setBookings((prev) => [newBooking, ...prev]);

    showSuccess(
      `Booking confirmed! Total: ${bookingSummary.total.toLocaleString()} KZT`
    );

    setForm(initialForm);
    setErrors({});
  }

  function handleDeleteBooking(id) {
    setBookings((prev) => prev.filter((booking) => booking.id !== id));
    showSuccess("Booking deleted successfully");
  }

  return (
    <div className="container">
      <div className="hero">
        <h2>{t("booking")}</h2>
        <p className="muted">
          {isFromMenu
            ? "View your confirmed booking history."
            : "Complete the booking form."}
        </p>
      </div>

      {selectedCar && (
        <div className="booking-layout">
          <div className="card booking-card">
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
              className="booking-car-img"
            />

            <div className="card-body">
              <h3>{selectedCar.name} Specifications</h3>

              <ul className="card-list clean-list">
                <li>
                  <strong>Type:</strong> {selectedCar.type}
                </li>
                <li>
                  <strong>Engine:</strong> {selectedCar.engine || "2.0L"}
                </li>
                <li>
                  <strong>Fuel:</strong> {selectedCar.fuel || "Petrol"}
                </li>
                <li>
                  <strong>Transmission:</strong> {selectedCar.transmission}
                </li>
                <li>
                  <strong>Seats:</strong> {selectedCar.seats} Persons
                </li>
                <li>
                  <strong>Daily Rate:</strong>{" "}
                  <span className="price-text">
                    {selectedCar.pricePerDay.toLocaleString()} KZT
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="form-card booking-form-card">
            <form onSubmit={handleSubmit} className="form" noValidate>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={form.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? "form-input-error" : ""}
                />
                {errors.fullName && (
                  <span className="form-error">{errors.fullName}</span>
                )}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+7 (XXX) XXX-XXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className={errors.phone ? "form-input-error" : ""}
                />
                {errors.phone && (
                  <span className="form-error">{errors.phone}</span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={form.pickupDate}
                    onChange={handleChange}
                    className={errors.pickupDate ? "form-input-error" : ""}
                  />
                  {errors.pickupDate && (
                    <span className="form-error">{errors.pickupDate}</span>
                  )}
                </div>

                <div className="form-group">
                  <label>Return Date</label>
                  <input
                    type="date"
                    name="returnDate"
                    min={form.pickupDate || new Date().toISOString().split("T")[0]}
                    value={form.returnDate}
                    onChange={handleChange}
                    className={errors.returnDate ? "form-input-error" : ""}
                  />
                  {errors.returnDate && (
                    <span className="form-error">{errors.returnDate}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Pickup Location</label>
                <input
                  type="text"
                  name="pickupLocation"
                  placeholder="Airport, Office, or Address"
                  value={form.pickupLocation}
                  onChange={handleChange}
                  className={errors.pickupLocation ? "form-input-error" : ""}
                />
                {errors.pickupLocation && (
                  <span className="form-error">{errors.pickupLocation}</span>
                )}
              </div>

              <div className="summary-panel">
                <p>
                  Total Rental Duration:{" "}
                  <strong>{bookingSummary.days} days</strong>
                </p>

                <h3>
                  Total Price: {bookingSummary.total.toLocaleString()} KZT
                </h3>
              </div>

              <div className="form-actions">
                <button className="btn primary" type="submit">
                  Confirm Booking
                </button>

                <button
                  className="btn"
                  type="button"
                  onClick={() => navigate("/cars")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isFromMenu && (
        <div className="booking-history">
          <h2>Booking History</h2>

          {bookings.length === 0 ? (
            <div className="empty-state">
              <h3>No bookings yet</h3>
              <p>Your confirmed bookings will appear here.</p>
            </div>
          ) : (
            <div className="grid">
              {bookings.map((booking) => (
                <div className="card" key={booking.id}>
                  <img
                    src={booking.carImage}
                    alt={booking.carName}
                    className="car-card-img"
                  />

                  <div className="card-body">
                    <div className="card-title">
                      <h3>{booking.carName}</h3>
                      <span className="tag">{booking.carType}</span>
                    </div>

                    <ul className="card-list">
                      <li>
                        <strong>Customer:</strong> {booking.fullName}
                      </li>
                      <li>
                        <strong>Phone:</strong> {booking.phone}
                      </li>
                      <li>
                        <strong>Pickup:</strong> {booking.pickupDate}
                      </li>
                      <li>
                        <strong>Return:</strong> {booking.returnDate}
                      </li>
                      <li>
                        <strong>Location:</strong> {booking.pickupLocation}
                      </li>
                      <li>
                        <strong>Days:</strong> {booking.days}
                      </li>
                      <li>
                        <strong>Total:</strong>{" "}
                        {booking.total.toLocaleString()} KZT
                      </li>
                    </ul>

                    <button
                      className="btn danger"
                      onClick={() => handleDeleteBooking(booking.id)}
                    >
                      Delete Booking
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}