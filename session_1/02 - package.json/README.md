# package.json

`package.json` is a Node.js project configuration file.
It contains project information and configuration such as:
- Project Name
- Project Version
- Author
- Main Entry
- Project Dependencies 
and more...

### To create a new `package.json file` for the project run:
`npm init`

### Two options for running our default file:
- Add to package.json
`"main": "the-starting-file"`
and then on the terminal run: `node .` (where the dot specifies the current folder).

- Add to package.json
`"scripts": { "start": "node the-starting-file" }` and then on the terminal run: `npm start`.
