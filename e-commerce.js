"use strict";

const readline = require("readline");


function prompt(query){
  // Pseudo synchronous Behaviour based on Asynchronous behaviour
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(query, (answer)=>{
      rl.close();
      resolve(answer);
    });
    reject('I/O error encountered Please restart Application');
  });
}

