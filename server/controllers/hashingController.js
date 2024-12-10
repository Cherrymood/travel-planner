import bcrypt from "bcrypt";

export default async function hashBCRypt(password, saltRounds = 10) {
  try {
    // Return a Promise that resolves with the hashed password
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
