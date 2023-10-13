// Error class inbuilt in JS 

class AppError extends Error {
    constructor(message, statusCode){

        // invokes the constructor of the parent class with "message" arguement
        super(message);

        // below two are custom defined. not part of Error class 
        this.statusCode = statusCode;
        this.explanation = message;
    }
}
module.exports = AppError;


// class ValidationError extends Error {
//   constructor(message) {
//     super(message); // (1)
//     this.name = "ValidationError"; // (2)
//   }
// }

// function test() {
//   throw new ValidationError("Whoops!");
// }

// try {
//   test();
// } catch(err) {
//   alert(err.message); // Whoops!
//   alert(err.name); // ValidationError
//   alert(err.stack); // a list of nested calls with line numbers for each
// }