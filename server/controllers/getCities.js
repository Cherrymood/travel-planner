
import fs from "fs/promises";
import path from "path";

const filePath = path.resolve("server", "cities.json");

// Utility: Read data from file
async function readData() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data from file:", error);
    throw new Error("Failed to read data");
  }
}

// Utility: Write data to file
async function writeData(data) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing data to file:", error);
    throw new Error("Failed to write data");
  }
}

// Get all cities
async function getCities(req, res) {
  try {
    const data = await readData();
    const cities = data.cities || [];
    res.json(cities);

  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
// Get city by ID
async function getCity(req, res) {
  try {
    const cityId = parseInt(req.params.id, 10);
    if (isNaN(cityId)) {
      return res.status(400).json({ message: "Invalid city ID" });
    }

    const data = await readData();
    const city = data.cities?.find((c) => c.id === cityId);


    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createCity(req, res) {
  try {
    const newCity = req.body;
    if (!newCity || !newCity.cityName || !newCity.position) {
      return res
        .status(400)
        .json({ message: "City name and position are required" });
    }

    const { lat, lng } = newCity.position;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({ message: "Invalid position coordinates" });
    }

    const data = await readData();
    const cities = data.cities || [];

    if (cities.some((city) => city.cityName === newCity.cityName)) {
      return res.status(409).json({ message: "City already exists" });
    }

    const cityWithId = {
      ...newCity,
      id: Date.now() + Math.floor(Math.random() * 1e4),
    };
    cities.push(cityWithId);

    await writeData({ cities });

    res
      .status(201)
      .json({ message: "City created successfully", city: cityWithId });
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Delete a city
async function deleteCity(req, res) {
  try {
    const cityId = parseInt(req.params.id, 10);
    if (isNaN(cityId) || cityId <= 0) {
      return res.status(400).json({ message: "Valid city ID is required" });
    }

    const data = await readData();
    const cities = data.cities || [];

    const cityIndex = cities.findIndex((city) => city.id === cityId);
    if (cityIndex === -1) {
      return res.status(404).json({ message: "City not found" });
    }

    cities.splice(cityIndex, 1);

    await writeData({ cities });

    res.status(200).json({ message: "City deleted successfully", cityId });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getCities, getCity, createCity, deleteCity };
