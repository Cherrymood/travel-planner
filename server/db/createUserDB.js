export default async function createUserDB(client, object) {
  const result = await client
    .db("Travel-Planner")
    .collection("Auth")
    .insertOne(object);
  console.log(
    `New listing created with the following id: ${result.insertedId}`
  );
}
