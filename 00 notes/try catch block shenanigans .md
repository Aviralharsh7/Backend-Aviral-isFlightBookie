# try catch block shenanigans

1. syntax 
    
    ```jsx
    try {
    	// main shit 
    } catch (error) {
    		throw new AppError( "some message", "some http code");
    }
    ```
    
    - throw is an statement that is used to re-throw the error that was caught by catch block. By explicitly throwing the error, we can config the error handling process or propogating the errorr to higher level catch blocks.
    - here, althouh, error handling involves -
        - throw creates a new instance of the class named “AppError”