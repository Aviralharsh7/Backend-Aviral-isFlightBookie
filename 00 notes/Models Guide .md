# Models Guide

Status: Backend - Flight services
Tags: main

## 6. Defining models

- The Schema allows you to define the fields stored in each document along with their validation requirements and default values.
- In addition, you can define static and instance helper methods to make it easier to work with your data types, and also virtual properties that you can use like any other field, but which aren't actually stored in the database
    
    
- Schemas are then "compiled" into models using the `**mongoose.model()**` method. Once you have a model you can use it to find, create, update, and delete objects of the given type.
- Each model maps to a *collection* of *documents* in the MongoDB database.
- Various ways to define schema fields - [https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#:~:text=Schema types (fields)](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose#:~:text=Schema%20types%20(fields))

## 5. Connecting to database

- in mongoose, we use the connect( ) method which is async
    
    ```jsx
    const mongoose = require("mongoose");
    
    const mongoDB = "mongodb://127.0.0.1/my_database";
    main().catch((err) => console.log(err));
    async function main() {
      await mongoose.connect(mongoDB);
    }
    ```
    
    - here the method returns a connection object which needs to be stored somewhere like `**const connectDB = async () ⇒ {**`
    - You can get the default `**Connection`** object with `**mongoose.connection**`. If you need to create additional connections you can use
    - If you need to create additional connections you can use `mongoose.createConnection()`. This takes the same form of database URI (with host, database, port, options, etc.) as `connect()` and returns a `Connection` object). Note that `createConnection()` returns immediately; if you need to wait on the connection to be established you can call it with `asPromise()` to return a promise (`mongoose.createConnection(mongoDB).asPromise()`).
- in postgreSQL,
    - [Setup and define postgreSQL](concepts%208558f3ed600d4834be9bd7f0dcca4c02/concepts%2043cd34ec0bb2460aa0f92fe57623e405/Setup%20and%20define%20postgreSQL%20faaa9ef9dc6f4952919ad19207eaea95.md)
    

## 4. Designing UML

- create separate models for each object - object is group of related information -
    - aka articles, users, comments, tags
    - aka  airplanes, airports, cities, flights
- each object has more finer details about it - which we defined as fields.
    - we created model for tags separtely instead of being part of articles because we cant hard code them and tagList should be dynamic.
- now, after defining the models and fields, we define the relationship between them using UML (unified modeling language)
    - establish basic fields
    - add more fields as we start writing controllers and need more custom methods perhaps
- now, we come to database method
    - they are asynchronous - it means that methods returns immediately but the code to handle the success or failure of this method runs at a later time when the operation is complete. so other code executes while server waits for database operation to complete. server is responsive to other requests.
        - to handle success failure of async methods, JS used callback function but nowadays, it uses Promises.
        - more [Promise.all vs await ](concepts%208558f3ed600d4834be9bd7f0dcca4c02/concepts%2043cd34ec0bb2460aa0f92fe57623e405/Promise%20all%20vs%20await%20c17289e756a44051b350aa9c869e9f8d.md)
        

## 3. mongo, postgre features

- A "collection" of "documents" in a MongoDB database [is analogous to](https://www.mongodb.com/docs/manual/core/databases-and-collections/) a "table" of "rows" in a PostgreSQL
- mongoose ODM vs sequelize ORM
- (document oriented database + use nosql)
- (relational database + using sql)

|  | MongoDB | PostgreSQL |
| --- | --- | --- |
| Qualities  | higher queries 
flexible  | high accessbile (foreign keys)
secure  |
| Use cases  | faster development 
content management system  | high traffic sites 
high security (follow lots of protocols)  |
|  | document based (json) >  hierarchial rel using a single record  | table based (tables) |
|  | no schema | has schema  |
|  | DBMS | RDBMS |
|  | json query language | SQL language  |

## 2. Best way to interact with a database

- Types
    - native query language like SQL
    - using ORM / ODM - this model represents the data as javascript objects. they handle the underlying SQL operations required to interact with the database.
- Performances wise
    - SQL provides best performance as ODM has transition code and can get especially slow when supporting different backends
    - ODM benefit is that we get javascript for coding instead of database semantics
- Example of few ODMs -
    - mongooose - works with mongoDB in asynchronous environmnet
    - sequelize - promise based ORM for nodejs and supports dialects like PostgreSQL, MySQL and features solid transaction support, relations, read replication, etc.
        - MySQL is known for its speed and reliability.
        - transactins are used to group multiple database operations into a single unit of work. sequelize does this with strong data integrity and consistency.
        - Sequelize supports read replication, which can improve the read performance of your application by directing read queries to replicas of your database while reserving the primary database server for write operations.
    - graphQL - query language for restful APIs, for greater control over data and solves the problem of over-fetching and under-fetching.
        - SQL manages relational databases, meanwhile graphQL is for APIs and gives clients more flexibility to specify their data needs.
        - if differs from SQL in following ways - dynamic queries, flexible schema, unstructured data, client centric — instead of being static queries, fixed schema, structured data, server centric

## 1. Choosing a database

- learning curve
- performance cases
- ease of replication
- community support