# airplane.js (old)

```jsx
"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Airplane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Airplane.hasMany(models.Flight, {
        foreignKey: 'airplaneId',
      });
    }
  } 
```

- **`"use strict";`**: This line enables strict mode in JavaScript, which helps catch common coding mistakes and "unsafe" actions. It's considered good practice to use strict mode in JavaScript to make your code more reliable.
    - duplicate parameters
    - undefined variables
    - this keyword behaviour
    - octal literal syntax (cant start with 0 in strict mode)
- destructuring a class named “model” from the “sequelize” library which itself is an instance defined in models>index.js
- we are exporting a nameless arrow function which takes two arguments.
    - we define the “Airplane” model as a class that extends the “Model” class. > it means airplane class inherits the various method and properties of model class.
    - we define another function which is a static method. it contains the associations bw airplane model and other models.

```jsx
Airplane.init(
  {
    modelNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Airplane",
  }
);
```

- `**Model.init(attributes, options);` -** init method is used to define the attributes and configuration of the model
    - attributes - is an object where we define the columns of our model. each attribute is a key-value pair
    - options - provides additional configuration options for the model like setting table (model) name, specifying a specific sequelize instance, etc