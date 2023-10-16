# use of async function

## code without async handler

```jsx
// Controller
async function getAllAirplane(req, res) {
    try {
        const airplanes = await airplaneService.getAllAirplane();
        successResponse.data = airplanes;
        return res.status(StatusCodes.OK).json(successResponse);
    } catch (error) {
        errorResponse.error = error;
        return res.status(error.statusCode).json(errorResponse);
    }
}

// Service 
async function getAllAirplane() {
    try {
        const airplanes = await airplaneRepository.getAll();
        return airplanes;
    } catch (error) {
        throw new AppError(
            "Data for all airplanes cannot be retrieved",
            StatusCodes.INTERNAL_SERVER_ERROR
        );
    }
}

// Repository 
async getAll() {
    const response = await this.model.findAll();
    return response;
}
```

## with async handler

```jsx
const asyncHandler = require('express-async-handler');

// Controller
const getAllAirplane = asyncHandler(async (req, res) => {
    const airplanes = await airplaneService.getAllAirplane();
    successResponse.data = airplanes;
    res.status(StatusCodes.OK).json(successResponse);
});

// Service
const getAllAirplane = asyncHandler(async () => {
    const airplanes = await airplaneRepository.getAll();
    return airplanes;
});

// Repository
async getAll() {
    const response = await this.model.findAll();
    return response;
}
```

## pros of not using

1. We get to explicitly define errors right where the code is instead of taking all the errors in some middleware code. 
    1. it gives greater control over error handling 

## cons of not using it

1. we can have more streamlined error handling process - resulting in cleaner code tbh!! 

## implementing express handler middleware (later)

```jsx
const asyncHandler = require('express-async-handler');
const { StatusCodes } = require('http-status-codes');
const AppError = require('./appError');

// Error handling middleware
function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    // If the error is an instance of AppError (custom error class), use its status code and message.
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  // For other unexpected errors, log the error and send a generic error response.
  console.error(err);
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: 'Internal Server Error',
  });
}

module.exports = {
  errorHandler,
  asyncHandler,
};
```

```jsx
const express = require('express');
const { asyncHandler, errorHandler } = require('./errorHandlingMiddleware');

const app = express();

// Route using asyncHandler
app.get('/example', asyncHandler(async (req, res) => {
  // Async code here
  throw new AppError('Custom error message', StatusCodes.BAD_REQUEST);
}));

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```