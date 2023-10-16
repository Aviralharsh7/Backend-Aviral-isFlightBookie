# CRUD and MVC theory

1. **CRUD** - roughly correlate to the HTTP methods that you can employ in an express app. This definition can be somewhat flexible, but in general `create` correlates to `POST` (or `app.post()` in an express app), `read` correlates to `GET` (`app.get()`), `update` to `PUT` (`app.put()`) and `delete` to `DELETE` (`app.delete()`)

1. **Models** - for every type of entry in your DB (book, author, etc. in our Library Project), you’ll create a model that will hold the details of that type of entry. Models define the types of information that get used by your views and controllers.

1. **Views -** the component that generates the UI for your application. In our case, we’ve selected a templating engine that uses data supplied by a controller to display the desired information.

1. **********************Controllers********************** - would be called by Express whenever we get a request, say `**app.get()**` . It would then use the details of the request to determine which views is shown 
    - it also defines logic for populating object which are added to response object of http request.
    - logic also includes use of custom or static model methods