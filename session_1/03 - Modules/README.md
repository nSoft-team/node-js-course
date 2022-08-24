# Modules

- A Node.js Module is a separate JavaScript file.

- The name of the file is the name of the Module.
Node.js automatically wraps the inner code with the following IIFE:
```
(function(exports, require, module, __filename, __dirname){
    Module Code...
})(...);
```
- This IIFE is called 'Module Wrapper Function'.

- Thus any variable or function defined inside the Module are not part of the global object, but are private to the Module.
- The Module can export variables, objects and functions outside.
- The first JavaScript file we're running is also a Module and is called the Main Module.
- Node comes with several built-in Modules like `fs`, `os`, `http` and more.
