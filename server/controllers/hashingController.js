import bcrypt from "bcrypt";

async function hashPassword(password, saltRounds = 10) {
  try {
    // Return a Promise that resolves with the hashed password
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}

async function compareHashedPassword(password, hash) {
  try {
    // Return a Promise that resolves with the hashed password
    const result = await bcrypt.compare(password, hash);

    return result;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
}
export { hashPassword, compareHashedPassword };
