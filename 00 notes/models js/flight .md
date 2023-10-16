# flight

```jsx
this.belongsTo(models.Airplane, {
    // A flight will belong to an Airplane
    foreignKey: "airplaneId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  });
```

- belongsTo - defines association bw two models.
- foreignKey - here we are specifying the name of foreign key. there will be column in flight model named “airplaneId” which holds reference to associated “airplane” instance.
    - whenever a flight record is created or updated, the value in this column will link it to a specific “airplane” record.
- onDelete - specifies what will happen when that associated airplane record is deleted.
    - cascade means - if airplane record is deleted then flight record is also deleted with it. this ensures that there are no “orphaned” records
- onUpdate - specifies what will happen when the primary key of “airplane” record is updated
    - cascade here means - if pk of airplane change, fk of associated flight will also be updated

```jsx
this.belongsTo(models.Airport, {
      foreignKey: 'departureAirportId',
      as: 'departureAirport',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  });
  this.belongsTo(models.Airport, {
      foreignKey: 'arrivalAirportId',
      as: 'arrivalAirport',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
  });
```

- ‘as’ option - specifies aliases for the association. so we can give a descriptive and meaningful name to the associated model
- if ‘as’ wasnt used, the default name is typically based on the name of the associated model and may include a suffix like "Id" for **`belongsTo`** associations.