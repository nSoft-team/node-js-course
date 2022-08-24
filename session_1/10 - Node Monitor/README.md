# Node Monitor

- By default, node runs our file once and that's it. In case we want to run it continuously and control the process, we need another tool in our disposal.
- `nodemon` (Node Monitor) is a package which watches over source code changes and updates the running app accordingly.

```
npm i nodemon -g			Install nodemon.
nodemon <filename.js>	Run filename.js file.
nodemon start			Run index.js if exists, or the file specified in "main" section in package.json.
nodemon					Run index.js if exists, or the file specified in "main" section in package.json.
```
