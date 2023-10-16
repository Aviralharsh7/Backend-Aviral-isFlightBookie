# Setup and define postgreSQL

# Setting up

1. in our system (not directory),
    - `**sudo apt update`**
    - `**sudo apt install postgresql postgresql-contri`**
        - postgresql-contri provides some useful utilities
    - confirm installation via `**psql —version`**
    - Set admin password via `**sudo passwd postgres**`
    - Start the server via `**sudo service postgresql start`**
    - switch to postgres user if “root” user does not exist `**sudo -su postgres`**
    - login this postgres user via `**su - postgres**`
        - sudo command wont work with this user because it is not authorized enough.
2. create the database via `**createdb flightServiceDB`** 
3. connect to the database via `**psql -d flightServiceDB`** 
4. in our project directory - 
    - we need to install client library like ‘pg’ via **`npm install sequelize pg pg-hstore`**
        - **`sequelize`**: The Sequelize library for working with databases.
        - **`pg`**: The PostgreSQL driver for Sequelize.
        - **`pg-hstore`**: A library to work with PostgreSQL hstore data typ
5. in our express app - 
    - require the ‘sequelize’ library via **`const Sequelize = require('sequelize');`**
    - setup connection to postgres database via
        
        ```jsx
        const sequelize = new Sequelize('yourdbname', 'yourusername', 'yourpassword', {
          host: 'localhost',
          dialect: 'postgres',
        });
        ```
        
6. We now define models using sequelize
    
    ```jsx
    const { DataTypes } = require('sequelize');
    const sequelize = require('./config');
    
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
    });
    ```
    
7. we can now use our “db object” to interact with database by executing SQL queries like ~~-~~ 
    
    ```jsx
    db.one('INSERT INTO yourtable(column1, column2) VALUES($1, $2) RETURNING id', [value1, value2])
      .then(data => {
          console.log('Data inserted with ID:', data.id);
      })
      .catch(error => {
          console.error('Error:', error);
    });
    ```