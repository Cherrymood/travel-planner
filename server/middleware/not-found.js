import CustomAPIError from "../errors/custom-api.js";

class NotFoundError extends CustomAPIError {
  constructor(message) {}
}

export default NotFoundError;
