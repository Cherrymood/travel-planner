import fs from "fs";
import path from "path";

const filePath = path.resolve("server", "cities.json");

async function readFile() {
  try {
    const data = await fs.promises.readFile(filePath, "utf-8");

    const parsedData = JSON.parse(data);

    return parsedData.cities;
  } catch (error) {
    console.error("Error reading the file:", error);
  }
}

const cities = await readFile();
console.log(cities);

async function getCities(req, res) {
  try {
    res.json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCity(req, res) {
  try {
    // Extract and validate city ID from request params
    const cityId = parseInt(req.params.id, 10);

    if (isNaN(cityId)) {
      return res.status(400).json({ message: "Invalid city ID" });
    }

    // Find the city by its ID
    const city = cities.find((c) => c.id === cityId);

    // If city is not found, return 404
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    // Return the found city
    res.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createCity(req, res) {
  try {
    const newCity = req.body;
    console.log("Received new city data:", newCity);

    // Validate newCity object
    if (!newCity || !newCity.cityName) {
      return res.status(400).json({ message: "City name is required" });
    }

    // Read existing cities from file
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const cities = parsedData.cities || [];

    // Check for duplicate city names
    const duplicateCity = cities.find(
      (city) => city.cityName === newCity.cityName
    );
    if (duplicateCity) {
      return res.status(409).json({ message: "City already exists" });
    }

    // Add the new city with a unique ID
    const cityWithId = {
      ...newCity,
      id: Date.now() + Math.floor(Math.random() * 1e4),
    };
    cities.push(cityWithId);

    // Write updated cities to file
    fs.writeFileSync(filePath, JSON.stringify({ cities }, null, 2), "utf-8");

    // Send response
    return res
      .status(201)
      .json({ message: "City created successfully", city: cityWithId });
  } catch (error) {
    console.error("Error creating city:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteCity(req, res) {
  try {
    const cityId = parseInt(req.params.id, 10);

    // Validate cityId
    if (isNaN(cityId) || cityId <= 0) {
      return res.status(400).json({ message: "Valid city id is required" });
    }

    // Read existing cities from file
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    const cities = parsedData.cities || [];

    // Check if the city exists
    const cityIndex = cities.findIndex((city) => city.id === cityId);
    if (cityIndex === -1) {
      return res.status(404).json({ message: "City not found" });
    }

    // Remove the city from the array
    const updatedCities = cities.filter((city) => city.id !== cityId);

    // Write updated cities to file
    fs.writeFileSync(
      filePath,
      JSON.stringify({ cities: updatedCities }, null, 2),
      "utf-8"
    );

    // Send response
    return res
      .status(200)
      .json({ message: "City deleted successfully", cityId });
  } catch (error) {
    console.error("Error deleting city:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getCities, getCity, createCity, deleteCity };
