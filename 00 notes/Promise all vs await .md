# Promise.all vs await

- Promises are objects that are (immediately) returned by an asynchronous method that represent it's future state. When the operation completes, the promise object is "settled", and resolves an object that represents the result of the operation or an error.
- we'll primarily be using [await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await) to wait on promise completion within an [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
    - here, the methods over which “await” is used - run in sequence
    - we first mark the function asynchronous with keyword “async”  and then inside that function, we apply “await” to any method that returns a promise.
    - From the perspective of the surrounding code the asynchronous function then returns and the code after it is able to run. Later when the promise settles, the `await` method inside the asynchronous function returns with the result, or an error is thrown if the promise was rejected. The code in the asynchronous function then executes until either another `await` is encountered, at which point it will pause again, or until all the code in the function has been run.
- if we want to run async methods of the async function, then we use Promise.all( ) method.
    - this method takes an iterable of promises as input and returns a single promise.
    
    ```jsx
    async function myFunction {
      // ...
      const [resultFunction1, resultFunction2] = await Promise.all([
         functionThatReturnsPromise1(),
         functionThatReturnsPromise2()
      ]);
      // ...
      await anotherFunctionThatReturnsPromise(resultFunction1);
    }
    ```
    
    - here Promise1 and Promise2 are run in parallel
    - here, await on “Promise.all” and “anotherFunctionThatReturnsPromise” are run in sequence.