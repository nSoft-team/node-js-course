#!/usr/bin/env node

function displaySomethingNice() {
  const num = Math.floor(Math.random() * 3);

  switch (num) {
    case 0:
      console.log("You are beautiful!");
      break;
    case 1:
      console.log("You are amazing!");
      break;
    case 2:
      console.log("You are magnificent!");
      break;
  }
}

displaySomethingNice();
