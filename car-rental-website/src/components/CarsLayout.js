import React from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export default function CarsLayout({ cars, onDelete, addCar, updateCar, getCarById }) {
  return <Outlet context={{ cars, onDelete, addCar, updateCar, getCarById }} />;
}

CarsLayout.propTypes = {
  cars: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  addCar: PropTypes.func.isRequired,
  updateCar: PropTypes.func.isRequired,
  getCarById: PropTypes.func.isRequired,
};

