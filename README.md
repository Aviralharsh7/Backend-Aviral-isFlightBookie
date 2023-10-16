# Backend of Flight Services

*using Express.js and Sequelize*

## Features

- Implemented the Model-View-Controller (MVC) architecture
    - abstracted business logic to service folder
    - abstracted schema methods to repository folder
- Implemented Transactions during seat booking (at row level) to prevent simultaneously booking of same seats.
- CRUD operations on Flight, Airplane, Airport, City models.
- Increment or decrement remaining seats on a flight wrt booking/ cancellation.
</br>

- Implemented Winston logger for locally distributed logging of errors
- Implemented JSON Web Token for secure access to CRUD operations on database.
- Implemented CORS for securing server requests.
</br>


- Robust error handling via custom error object formatting class.
- Standardised response object formatting.
- Standardised http codes via “http-status-codes” library

## Project Tree

``` bash
├── app.js
├── config
│   ├── allowedOrigins.js
│   ├── configDB.json
│   ├── corsOptions.js
│   ├── index.js
│   ├── loggerConfig.js
│   ├── serverConfig.js
│   └── verifyJWT.js
├── controllers
│   ├── airplaneController.js
│   ├── airportController.js
│   ├── cityController.js
│   ├── flightController.js
│   └── index.js
├── middlewares
│   ├── airplaneMiddleware.js
│   ├── airportMiddleware.js
│   ├── cityMiddleware.js
│   ├── flightMiddleware.js
│   └── index.js
├── models
│   ├── airplane.js
│   ├── airport.js
│   ├── city.js
│   ├── flight.js
│   └── index.js
├── package-lock.json
├── package.json
├── public
├── repository
│   ├── airplaneRepository.js
│   ├── airportRepository.js
│   ├── cityRepository.js
│   ├── crudRepository.js
│   ├── flightRepository.js
│   └── index.js
├── routes
│   ├── index.js
│   ├── root.js
│   └── v1
│       ├── airplaneRoutes.js
│       ├── airportRoutes.js
│       ├── cityRoutes.js
│       ├── flightRoutes.js
│       └── index.js
├── services
│   ├── airplaneService.js
│   ├── airportService.js
│   ├── cityService.js
│   ├── flightService.js
│   └── index.js
├── test
├── utils
│   ├── errorFormatting
│   │   └── appError.js
│   ├── helpers
│   │   └── dataTime-helpers.js
│   └── responseFormatting
│       ├── errorResponse.js
│       ├── index.js
│       └── successResponse.js
├── views
└── AllLogs.log

```

## Project Setup

- clone the repository
- check if `npm` is installed via `npm -v`
- run `npm install` on root directory to install dependencies
- create a `.env` file in root directory and add the following variable
- run `npm run start`

## Environment variables

```jsx
BB# .env

NODE_ENV = development
PORT = 4200

ACCESS_TOKEN_SECRET = jaiMataDi

DB_dev_USERNAME= asd
DB_dev_PASSWORD= asd
DB_dev_HOST= asd
DB_dev_PORT= asd

DB_prod_USERNAME= asd
DB_prod_PASSWORD= asd
DB_prod_HOST= asd
DB_prod_PORT= asd
```

## DB Design

- One City can have many Airports.
- One Airport can have many flights.
- One Airplane can belong to many flights. (since one aircraft can have multiple routes but not overlapping routes)
    
    ![FlightService.png](https://github.com/Aviralharsh7/Backend-Aviral-isFlightBookie/blob/main/FlightService.png)
    

## DB Choices

- Unique validation on -
    - [city.name](http://city.name)
    - airport.address
- Max Airplane capacity = 1000 (default = 0)
- Max difference between arrival and departure time = 23:50:00 hours
- Max price of seat = 10,00,000
