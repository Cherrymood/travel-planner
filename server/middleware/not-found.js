export default async function notFound(req, res) {
  res.status(404).send("Route does not exist");
}
