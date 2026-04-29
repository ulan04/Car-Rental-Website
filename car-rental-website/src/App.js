import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./components/AuthContext";
import { LanguageProvider } from "./components/LanguageContext";
import { ToastProvider } from "./components/ToastContext";
import { ThemeProvider } from "./components/ThemeContext";

import ProtectedRoute from "./components/ProtectedRoute";
import useLocalStorage from "./hooks/useLocalStorage";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CarsLayout from "./components/CarsLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import CarForm from "./pages/CarForm";
import Booking from "./pages/Booking";
import Support, { SupportContact, SupportFAQ } from "./pages/Support";
import NotFound from "./pages/NotFound";

import { carService } from "./services/api";

import LongTermRental from "./pages/LongTermRental";
import International from "./pages/International";
import Corporate from "./pages/Corporate";


const STORAGE_KEY = "car_rental_cars_v2";

function AppContent() {
  const { isLoggedIn } = useAuth();
  const [cars, setCars] = useLocalStorage(STORAGE_KEY, []);

  const addCar = async (newCar) => {
    const savedCar = await carService.addCar(newCar);
    setCars((prev) => [savedCar, ...prev]);
    return savedCar;
  };

  const updateCar = async (id, updated) => {
    const updatedCar = await carService.updateCar({ ...updated, id });
    setCars((prev) => prev.map((car) => (car.id === id ? updatedCar : car)));
    return updatedCar;
  };

  const deleteCar = async (id) => {
    await carService.deleteCar(id);
    setCars((prev) => prev.filter((car) => car.id !== id));
  };

  const getCarById = (id) => {
    return cars.find((car) => car.id === id);
  };

  return (
    <div className="app">
      {isLoggedIn && <Header />}

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cars"
            element={
              <ProtectedRoute>
                <CarsLayout
                  cars={cars}
                  onDelete={deleteCar}
                  addCar={addCar}
                  updateCar={updateCar}
                  getCarById={getCarById}
                />
              </ProtectedRoute>
            }
          >
            <Route index element={<Cars />} />
            <Route path="new" element={<CarForm mode="create" />} />
            <Route path=":id/edit" element={<CarForm mode="edit" />} />
          </Route>

          <Route
            path="/booking"
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            }
          />

          <Route path="/support" element={<Support />}>
            <Route index element={<SupportContact />} />
            <Route path="faq" element={<SupportFAQ />} />
          </Route>

          <Route path="*" element={<NotFound />} />

          <Route
  path="/long-term"
  element={
    <ProtectedRoute>
      <LongTermRental />
    </ProtectedRoute>
  }
/>

<Route
  path="/international"
  element={
    <ProtectedRoute>
      <International />
    </ProtectedRoute>
  }
/>

<Route
  path="/corporate"
  element={
    <ProtectedRoute>
      <Corporate />
    </ProtectedRoute>
  }
/>
        </Routes>
      </main>

      

      {isLoggedIn && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}