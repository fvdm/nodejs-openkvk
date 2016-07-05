/*
Name:           openkvk - test.js
Description:    Test script for openkvk.js
Author:         Franklin van de Meent (https://frankl.in)
Source & docs:  https://github.com/fvdm/nodejs-openkvk
Feedback:       https://github.com/fvdm/nodejs-openkvk/issues
License:        Unlicense (Public Domain) - see LICENSE file
*/

// Setup
var dotest = require ('dotest');
var openkvk = require ('./');


function testArrayObject (err, data) {
  var item = data && data instanceof Array && data [0];

  test (err)
    .isArray ('fail', 'data', data)
    .isNotEmpty ('fail', 'data', data)
    .isObject ('fail', 'data[0]', item)
    .isString ('fail', 'data[0].kvk', item && item.kvk)
    .done ();
}


dotest.add ('search by keywords', function (test) {
  openkvk ('ahold kunst', testArrayObject);
});


dotest.add ('search by kvks', function (test) {
  openkvk ('35030138', testArrayObject);
});


// Start the tests
dotest.run ();
