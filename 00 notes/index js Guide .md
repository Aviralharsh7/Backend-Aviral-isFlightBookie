# index.js Guide

Status: Backend - Flight services
Tags: main

## 1. why using http.createServer(app)

```jsx
app.listen(PORT, async () => {
    console.log(`Server started at ${PORT}`);
    if (process.env.SYNC_DB) {
      db.sequelize.sync({ alter: true });
    }
  });
```

- this method of starting server is more abstract as we directly use “listen” method on the express object that we created.

```jsx
var server = http.createServer(app);
server.listen(PORT, async() =>{
    console.log(`Server started at ${PORT}`);
    if(process.env.SYNC_DB){
        db.sequelize.sync({alter: true});
    }
});
```

- here, we explicitly create the server. this gives us ability to customise the server.
    - incase of https configuration before server runs
    - to load middleware on server before the express application is attached. aka perform certain actions before they reach the express routes.
    - websocket support
    - server event handling like “close” so then we can perform cleanup actions on closing the server.
    - to create multiple express application.

## 2. when to use db sequelize

```jsx
// create server
var server = http.createServer(app);
server.listen(PORT, async() =>{
    console.log(`Server started at ${PORT}`);
    if(process.env.SYNC_DB){
        db.sequelize.sync({alter: true});
    }
});
```

- it is used in SQL databases like MySQL, PostgreSQL, etc. Not in mongoDB which is NoSQL
- here `**db.sequelize.sync`** is executed if SYNC_DB is set to true
    - it essentially synchronise the data schema in our database according to models defined in our application
    - `**sequelize**` is ORM library and `**.sync( )**` is its method
    - **`{ alter: true }`** option typically tells Sequelize to automatically alter the existing schema to match the defined models if there are any changes.