import User from "./models/User.js"; // Adjust the path based on your file structure

export default async function createUserDB(client, userObject) {
  try {
    // Validate and create the user using the Mongoose model
    const user = new User(userObject);
    const result = await user.save();

    console.log(`New user created with the following id: ${result._id}`);
    return result;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error for the calling function to handle
  }
}
