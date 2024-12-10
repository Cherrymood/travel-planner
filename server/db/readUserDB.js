export default async function readUserDB(client, email) {
  try {
    const result = await client
      .db("Travel-Planner")
      .collection("Auth")
      .findOne({ email: email });

    return !!result; // Returns true if user exists, false otherwise
  } catch (error) {
    console.error("Error reading user from the database:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}
