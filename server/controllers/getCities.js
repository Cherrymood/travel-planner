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

    // Validate newCity object
    if (!newCity || !newCity.cityName) {
      return res.status(400).json({ message: "City data is required" });
    }
    // Add the new city
    const cityWithId = { ...newCity, id: Math.random() };
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

export { getCities, getCity, createCity };
