export default async function readUserDB(client, email) {
  try {
    const result = await client
      .db("Travel-Planner")
      .collection("Auth")
      .findOne({ email: email });

    // Return both the result and a boolean indicating existence
    return { result, userExists: !!result };
  } catch (error) {
    console.error("Error reading user from the database:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}
