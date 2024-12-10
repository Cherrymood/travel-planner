export default async function readUserDB(client, login) {
  const result = await client
    .db("Travel-Planner")
    .collection("Auth")
    .findOne({ login: login });

  if (result) {
    console.log(`Found a listing in the collection with the name '${login}':`);
    console.log(result);
  } else {
    console.log(`No listings found with the name '${login}'`);
  }
}
