import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Cars from "./pages/Cars";
import CarForm from "./pages/CarForm";
import Booking from "./pages/Booking";

const STORAGE_KEY = "car_rental_cars_v1";

const defaultCars = [
  { id: "1", name: "Toyota Camry", type: "Sedan", pricePerDay: 18000, seats: 5, transmission: "Automatic" },
  { id: "2", name: "Hyundai Tucson", type: "SUV", pricePerDay: 22000, seats: 5, transmission: "Automatic" },
  { id: "3", name: "Kia Carnival", type: "Minivan", pricePerDay: 30000, seats: 7, transmission: "Automatic" },
];

export default function App() {
  const [cars, setCars] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultCars;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
  }, [cars]);

  function addCar(newCar) {
    setCars((prev) => [{ ...newCar, id: crypto.randomUUID() }, ...prev]);
  }

  function updateCar(id, updatedCar) {
    setCars((prev) => prev.map((c) => (c.id === id ? { ...c, ...updatedCar, id } : c)));
  }

function deleteCar(id) {
  setCars((prev) => prev.filter((car) => car.id !== id));
}
  function getCarById(id) {
    return cars.find((c) => c.id === id);
  }

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/cars" replace />} />
        <Route path="/cars" element={<Cars cars={cars} onDelete={deleteCar} />} />

        <Route path="/cars/new" element={<CarForm mode="create" onSubmit={addCar} />} />

        <Route
          path="/cars/:id/edit"
          element={<CarForm mode="edit" onSubmit={updateCar} getCarById={getCarById} />}
        />

        <Route path="/booking" element={<Booking />} />

        <Route path="*" element={<div className="container">404 Not Found</div>} />
      </Routes>

      <Footer />
    </div>
  );
}