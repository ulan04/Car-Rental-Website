import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Cars from "./pages/Cars";
import CarForm from "./pages/CarForm";
import Booking from "./pages/Booking";
import Support, { SupportContact, SupportFAQ } from "./pages/Support";

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
    const next = { ...newCar, id: crypto.randomUUID() };
    setCars((prev) => [next, ...prev]);
  }

  function updateCar(id, updatedCar) {
    setCars((prev) =>
      prev.map((car) => {
        if (car.id === id) return { ...car, ...updatedCar, id };
        return car;
      })
    );
  }

  function deleteCar(id) {
    setCars((prev) => prev.filter((car) => car.id !== id));
  }

  function getCarById(id) {
    return cars.find((car) => car.id === id);
  }

  return (
    <div className="app">
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/cars" replace />} />

        <Route
          path="/cars"
          element={
            <CarsLayout
              cars={cars}
              onDelete={deleteCar}
              addCar={addCar}
              updateCar={updateCar}
              getCarById={getCarById}
            />
          }
        >
          <Route index element={<Cars />} />
          <Route path="new" element={<CarForm mode="create" />} />
          <Route path=":id/edit" element={<CarForm mode="edit" />} />
        </Route>

        <Route path="/booking" element={<Booking />} />

        <Route path="/support" element={<Support />}>
          <Route index element={<SupportContact />} />
          <Route path="faq" element={<SupportFAQ />} />
        </Route>

        <Route path="*" element={<div className="container">404 Not Found</div>} />
      </Routes>

      <Footer />
    </div>
  );
}

function CarsLayout({ cars, onDelete, addCar, updateCar, getCarById }) {
  return (
    <Outlet
      context={{
        cars: cars,
        onDelete: onDelete,
        addCar: addCar,
        updateCar: updateCar,
        getCarById: getCarById,
      }}
    />
  );
}
