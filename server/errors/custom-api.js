class CustomAPIError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name; // Sets the error name to the class name
  }
}

export default CustomAPIError;
