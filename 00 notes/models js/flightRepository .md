# flightRepository

## 1. getAllFlight( )

```jsx
async getAllFlights(filter, sort) {
    const response = await Flight.findAll({
      where: filter,
      order: sort,
      include: [
        {
          // Join is already made on the Primary Key Column
          // Eager Loading - Eager Loading is the act of querying data of several models at once (one 'main' model and one or more associated models). At the SQL level, this is a query with one or more joins.
          model: Airplane, // The entire Airplane Model Object will be fetched by airplaneId inside the Flight Model Object
          required: true, // When eager loading, we can force the query to return only records which have an associated model, effectively converting the query from the default OUTER JOIN to an INNER JOIN. This is done with the `required: true` option
        },
        {
          // Join is not made on the Primary Key Column, rather it is made on the Airport.code (Not Primary Key Column)
          model: Airport,
          required: true,
          as: "departureAirport", // Airport is associated to Flight multiple times. To identify the correct association, you must use the 'as' keyword to specify the alias of the association you want to include.
          // departureId is based on Airport.code and not based on Airport.id. But by default it will try to do the mapping on Airport.id but we want to do the mapping on Airport.code so for that we can specifically mention on what columns u want the comparison of the join to happen using `on:` property
          // On which particular columns u want to do the corresponding mapping
          on: {
            col1: Sequelize.where(
              // which columns to compare in the joining of 2 tables
              Sequelize.col("Flight.departureAirportId"),
              "=",
              Sequelize.col("departureAirport.code")
            ),
          },
          include: {
            model: City,
            required: true,
          },
        },

```

- SQL join
    - in relational databases, table are related to each other via keys. A join is used to combine rows from two or more tables based on a related column between them
    - here we join the tables named flight, airplane, airport, city.
    - it is made on primary key column of models
- Primary key - it is column or set of columns that uniquely identifies each row in a table. It is used to enforce uniqueness of rows.
- Eager loading - querying data of several models at once (one 'main' model and one or more associated models). At the SQL level, this is a query with one or more joins.
    - `**required: true**` — the join between 'Flight' and 'Airplane' is treated as an inner join. This ensures that only flights with associated airplanes are returned in the result set. Flights without associated airplanes are excluded from the results.

## 2. updateRemainingSeats( )

```jsx
async updateRemainingSeats(flightId, seats, dec = true) {
    const transaction = await db.sequelize.transaction();
```

- we initiate a transaction for data integrity reasons. It will group the following operation together and make sure state of platform remains constant
- transaction returns a promise

```jsx
try { 
    await db.sequelize.query(addRowLockOnFlight(flightId));
```

- to prevent concurrent access to same row by multiple transactions.
- custom SQL query to lock specific row in database.

```jsx
function addRowLockOnFlights(flightId) {
  return `SELECT * FROM Flights WHERE Flights.id = ${flightId} FOR UPDATE;`;
}
```

- **`SELECT *`** means that you want to select all columns (i.e., all data) from the "Flights" table.
- **`WHERE Flights.id = ${flightId}`**: The **`WHERE`** clause is used to specify a condition that must be met for a row to be selected. In this case, it's checking the "id" column of the "Flights" table.
- **`FOR UPDATE`**: This is a SQL locking statement. It's used to request a lock on the selected row. The **`FOR UPDATE`** clause is typically used in the context of transactions.

```jsx
const flight = await Flight.findByPk(flightId);
    if (+dec){
        await flight.decrement(
            'totalSeats',
            {by: seats},
            {transaction: transaction}
        );
    } else {
        await flight.increment(
            'totalSeats',
            {by: seats},
            {transaction: transaction}
        );
    }
```

- we first retrieve flight record
- +dec converts boolean value of “dec” parameter to numeric
- flight.decrement - method provided by sequelize library. in this method,
    - we specify name of column and by how much value u want to dec
- we also make sure this decrement or increment method is part of the same transaction
    - in case of error at later stage of this whole function, then this method will also be rolled back as whole transaction rolls back

```jsx
await transaction.commit();
return flight.reload();
```

- after all operations are successfully completed, without any error -
    - we commit the transaction aka saving all changes to the database.
- we also reload the “flight” instance from the database  and this reloaded instance is returned by the function which eventually should become part of response object

```jsx
} catch (error){
    await transaction.rollback();
    throw new AppError(
        "Requested changes cannot be made. Try again",
        StatusCodes.INTERNAL_SERVER_ERROR
    );
}
```

- if any error occur at any point, we executed the rollback method on our transaction
- we also define a custom error object using AppError class
    - and throw to higher function call to take care of it.