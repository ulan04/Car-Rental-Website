const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class APIError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "APIError";
    this.statusCode = statusCode;
  }
}

export const carService = {
  async addCar(newCar) {
    try {
      await delay(1000);
      if (!newCar.name || !newCar.type) {
        throw new APIError("Invalid car data: name and type are required", 400);
      }

      if (Math.random() < 0.05) {
        throw new APIError("Server error: Failed to add car", 500);
      }

      return { ...newCar, id: crypto.randomUUID() };
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError("Failed to add car: " + error.message, 500);
    }
  },

  async updateCar(car) {
    try {
      await delay(1000);

      if (!car.id || !car.name || !car.type) {
        throw new APIError("Invalid car data: id, name and type are required", 400);
      }

      if (Math.random() < 0.05) {
        throw new APIError("Server error: Failed to update car", 500);
      }

      return car;
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError("Failed to update car: " + error.message, 500);
    }
  },

  async deleteCar(id) {
    try {
      await delay(800);

      if (!id) {
        throw new APIError("Car ID is required", 400);
      }

      if (Math.random() < 0.05) {
        throw new APIError("Server error: Failed to delete car", 500);
      }

      return { id, deleted: true };
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError("Failed to delete car: " + error.message, 500);
    }
  },
};
