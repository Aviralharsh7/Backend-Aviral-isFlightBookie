# index.js (current)

```jsx
fs
  .readdirSync(__dirname)
  .filter(file =>{
      return (
          file.indexOf('.') !== 0 && 
          file !== basename && 
          file.slice(-3) === '.js'
      );
  })
  .forEach( file => {
      const model = require(path.join(__dirname, file))(
          sequelize, 
          Sequelize.DataTypes
      );
      db[model.name] = model;
  });
```

- **`fs.readdirSync(__dirname)`**: This code uses the **`fs`** module to read the contents of the current directory
    - **`__dirname`** is the directory where the current script is located
- **`.filter`** function is used to filter the list of files in the directory
    - **`file.indexOf('.') !== 0`**: This condition checks if the filename doesn't start with a dot ('.'), which typically represents hidden files.
    - **`file !== basename`**: It ensures that the file is not the current script itself
    - **`file.slice(-3) === '.js'`**: This checks if the file has a '.js' extension, indicating that it's a JavaScript file.
- **`.forEach(file => {...})`**: After filtering the files, this code iterates through each file in the list of JavaScript files.
    - For each file, it loads the model by using **`require`**. The model file is required and is typically expected to be a JavaScript module that exports a function
    - This function is immediately invoked and is passed two arguments: the **`sequelize`** instance and **`Sequelize.DataTypes`**.
        - The function is responsible for defining the model schema and associations, and it returns the created model.
    - **`db[model.name] = model`**: After loading and creating the model, it's added to the **`db`** object with a key equal to the model's name. This allows you to access the model later via the **`db`** object.

```jsx
Object.keys(db).forEach( modelName => {
    if (db[modelName].associate){
        db[modelName].associate(db);
    }
});
```

- **`Object.keys(db).forEach(modelName => {...})`**:
    - an array of all keys of db object is created
    - this array is then traversed using ForEach method
        - for each element in array (each model in db object) -
            - we check if each model has an “associate” method
            - if does, we call this associate method and pass it the db object as arugement -
                - what happens in this step is - when we pass the db object, the associate method gains access to all other methods defined in the application. it therefore, estalbishes association bw all these models wrt to how each association method is defined in each model.
                - it likes running all the associate methods of all the models. and making sure these models come out from db object.