export const createError = (status, message) => {
    const err = new Error(message);
    err.status = status;
    err.responseMessage = message; // Add a responseMessage property to the error object
    return err;
}

