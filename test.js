/*
Name:           openkvk - test.js
Description:    Test script for openkvk.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-openkvk
Feedback:       https://github.com/fvdm/nodejs-openkvk/issues
License:        Unlicense (Public Domain) - see LICENSE file
*/

// Setup
var openkvk = require ('./');


// handle exits
var errors = 0;
process.on ('exit', function () {
  if (errors === 0) {
    console.log ('\n\033[1mDONE, no errors.\033[0m\n');
    process.exit (0);
  } else {
    console.log ('\n\033[1mFAIL, '+ errors +' error'+ (errors > 1 ? 's' : '') +' occurred!\033[0m\n');
    process.exit (1);
  }
});

// prevent errors from killing the process
process.on ('uncaughtException', function (err) {
  console.log ();
  console.error (err.stack);
  console.trace ();
  console.log ();
  errors++;
});

// Queue to prevent flooding
var queue = [];
var next = 0;

function doNext () {
  next++;
  if (queue [next]) {
    queue [next] ();
  }
}

// doTest( passErr, 'methods', [
//   ['feeds', typeof feeds === 'object']
// ])
function doTest (err, label, tests) {
  if (err instanceof Error) {
    console.error ('\033[1m\033[31mERROR\033[0m - '+ label +'\n');
    console.dir (err, { depth: null, colors: true });
    console.log ();
    console.error (err.stack);
    console.log ();
    errors++;
  } else {
    var testErrors = [];
    for (var i = 0; i < tests.length; i++) {
      if (tests [i] [1] !== true) {
        testErrors.push (tests [i] [0]);
        errors++;
      }
    }

    if(testErrors.length === 0) {
      console.log ('\033[1m\033[32mgood\033[0m - '+ label);
    } else {
      console.error ('\033[1m\033[31mFAIL\033[0m - '+ label +' ('+ testErrors.join (', ') +')');
    }
  }

  doNext ();
}


queue.push (function () {
  openkvk ('ahold kunst', function (err, data) {
    doTest (err, 'search by keywords', [
      ['data type', data && data instanceof Array],
      ['data size', data && data.length >= 1],
      ['item type', data && data [0] && data [0] instanceof Object],
      ['item kvk', data && data [0] && typeof data [0].kvk === 'string']
    ]);
  });
});


queue.push (function () {
  openkvk ('35030138', function (err, data) {
    doTest (err, 'search by kvks', [
      ['data type', data && data instanceof Array],
      ['data size', data && data.length >= 1],
      ['item type', data && data [0] && data [0] instanceof Object],
      ['item kvk', data && data [0] && typeof data [0].kvk === 'string']
    ]);
  })
});


// Start the tests
console.log ('Running tests...\n');
queue [0] ();
