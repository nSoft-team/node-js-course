// Mocha: a testing framework for JavaScript and Node.js.
// Installation: npm i -g mocha
// All test files must be in a "test" directory in the root level, or in child directories.
// All test files must ends with .test.js.
// In package.json "scripts" section: { "test": "mocha --recursive --timeout some-milliseconds --exit" }
// The --timeout some-milliseconds is for increasing the default 2sec timeout so slow tests won't fail due to timeout.
// The --recursive is for testing inner directories.
// The --exit is for stopping the app after testing (e.g. when testing REST API, the tests will continue running without this flag).

// Chai: a testing library containing test commands.
// Installation: npm i --save-dev chai

// Running all tests: npm test

// Running one file tests: npm test path/to/file
// E.g: npm test test/calc.test.js

// Running one describe(...) or it(...) tests in any file: npm test -- --grep "some-regex"
// E.g: npm test -- --grep "getSum"
// grep is a Unix CLI command, shortage for: Globally search for a Regular Expression and Print matching lines.

// Running one describe(...) or it(...) tests in a specific file: npm test path/to/file -- --grep "some-regex"
// E.g: npm test test/calc.test.js -- --grep "getSum"
