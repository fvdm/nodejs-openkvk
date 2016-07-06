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
var app = require ('./');

var config = {
  apikey: process.env.OPENKVK_APIKEY || null,
  timeout: process.env.OPENKVK_TIMEOUT || null
};

var openkvk = app (config):


function testArrayObject (err, data) {
  var item = data && data instanceof Array && data [0];

  dotest.test (err)
    .isArray ('fail', 'data', data)
    .isNotEmpty ('fail', 'data', data)
    .isObject ('fail', 'data[0]', item)
    .isString ('fail', 'data[0].kvk', item && item.kvk)
    .done ();
}


dotest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', openkvk)
    .done ();
});


dotest.add ('search by keywords', function () {
  openkvk ('ahold kunst', testArrayObject);
});


dotest.add ('search by kvks', function () {
  openkvk ('35030138', testArrayObject);
});


// Start the tests
dotest.run ();
