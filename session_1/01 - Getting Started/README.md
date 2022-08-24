# Node.js Intro

## Overview
- Node.js is a JavaScript execution environment. It runs outside of a browser and suitable for creating the back-end.
- Built by Ryan Dahl in 2009 which took Chrome v8 Engine, embedded it in a C++ program and called it Node. First for Linux / Mac OS X, then for Windows.
- It uses a Package Manager called NPM (Node Package Manager).

## Async nature

- Just like the browser JavaScript - Node.js runs in a single threaded.
- Thus it must not halt the server on client request.
- Therefor it is async by nature - with callbacks being the tool to achieve this async style in an easy manner.
- The part handling the callbacks is called Event Loop. Under the hood, it basically uses the c++ threading model to achieve this.
- Node.js is less suitable for long running calculations in the server like image or video processing - although it can be achieved.
- It is most suitable for getting API requests and performing short disk access tasks - files or DB operations.
- Our responsibility as node.js developers is to handle the request and return the response, while keeping any I/O operation async and not blocking the event loop.
- This is mostly achieved naturally by using callbacks, promises and the latest and greatest - async/await. Which is syntactic sugar for callbacks.
- We can see the basic loop here - [https://i.stack.imgur.com/BTm1H.png]

## Node vs the browser
- In the browser JavaScript land we have JavaScript Engine (Chakra for Edge / SpiderMonkey for Firefox / v8 for Chrome), Web APIs, Callback Queue and the Event Loop.
- In Node.js land we have JavaScript Engine (v8), C++ APIs instead of the browser's Web APIs, Callback Queue and the Event Loop.
- In Node.js there is no browser, no window object, no document object and no DOM (although these are sometimes simulated using external libs)


### Installing Node.js: 
```
http://nodejs.org (Latest LTS recommended).
```

### Running Node.js - in command line or terminal:
```
node <file-name-with-or-without-.js>
```
