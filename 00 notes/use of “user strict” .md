# use of “user strict”

1. error prevention 
    - disallows use of certain error prone features and highlighting issues that otherwise would be silent in non strict mode.
2. Scope control 
    - variables must be declared with var, let, const before they are used. this prevents accidental global variable creation.
3. performance 
    - some js engines perform optimizations when strict mode is used.
4. future compatbility 
    - code written in strict mode is more compatible with future versions of ECMAScript.