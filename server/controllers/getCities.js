import data from "../cities.js";

const { cities } = data;
console.log(cities);

export default function getCities(req, res) {
  res.json(cities);
  console.log("Cookies: ", req.cookies);
  console.log("Signed Cookies: ", req.signedCookies);
}
