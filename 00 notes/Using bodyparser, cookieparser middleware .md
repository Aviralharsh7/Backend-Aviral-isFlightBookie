# Using bodyparser, cookieparser middleware

```jsx
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
```

- bodyparser process incoming http requests (post, put) to extract the request body and expose it on the request object.
- it takes care of data format - json, url encoded, xml, graphql
- for only json, url encoded data, we can use inbuilt express.json and express.urlencoded by default.

```jsx
app.use(cookieParser());

// set a cookie
app.get("/set-cookie", (req, res) => {
   res.cookie("username", "john");
   res.send("Cookie has been set!");
});

// get a cookie
app.get("/get-cookie", (req, res) => {
   const username = req.cookies.username;
   res.send(`The username is: ${username}`);
});

// delete a cookie
app.get("/delete-cookie", (req, res) => {
   res.clearCookie("username");
   res.send("Cookie has been deleted!");
});
```

- cookies are small pieces of data that are stored on client side.
- this middleware parses cookies which are part of HTTP requests.
    - it also provides security features like signing and encrypting cookies
- in three examples, we can see it simplifies the cookie parsing process.