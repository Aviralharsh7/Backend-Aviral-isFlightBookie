# index.js (old)

```jsx
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });
```

- first we read the contents of the directory where this script is loaded aka files inside models folder
- then, we filter these files with following condition
    - file name does not start with dot ‘.’
    - file name does not equal to “basename” which is probably file where this code is written (aka index.js)
    - file name must have .js extension
- now, we iterate over list of files which matched our filters. for each file we,
    - **`path.join(__dirname, file)`** constructs the absolute path to the js file by adding it to absolute file path of its parent directory.
    - after importing this file, immediately invoking the file as a function with two arguments: **`sequelize`** and **`Sequelize.DataTypes`** which are the expected arguements for the exported function of this file.
    - the result from these exported function is assigned to const object named “model”
- at last, we assign this object “model” to a particular key in object “db” named “model.name”

```jsx
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
```

- IMP -
    - main idea is that this is relational database, where different tables (models) are related to each other. so we use associate function to specify this. these relation can one many, many many, etc.
    - once relationships are defined, sequelize can generate SQL queries that take this rel into account. this allows us to retrieve related data simultaneously even if from other tables.
- **`db`** is an object that typically holds all your Sequelize models. In Sequelize, each model represents a table in your database.
- `**Object.keys(db)**` - retrieves an array of names of the properties in “db” object. these names are probably model names.
- now we iterate over the name of each model using forEach function -
    - we check if each model has an associate function defined inside it.
    - if it does, we call the associate function and pass it “db” object.
    - this allows the associate function to define and setup associations bw this model and other models in the “db” object.
        - such association are like - foreign keys, specifying rel bw models