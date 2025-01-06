import data from "../cities.js";

const { cities } = data;

async function getCities(req, res) {
  try {
    res.json(cities);
    console.log("Cookies:", req.cookies);
    console.log("Signed Cookies:", req.signedCookies);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function getCity(req, res) {
  try {
    const cityId = parseInt(req.params.id, 10); // Convert id from string to number
    const city = cities.find((c) => c.id === cityId);

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json(city);
  } catch (error) {
    console.error("Error fetching city:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { getCities, getCity };
