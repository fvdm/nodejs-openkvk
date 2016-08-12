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

var openkvk = app (config);


function testArrayObject (err, data) {
  var rp = data && data._embedded && data._embedded.rechtspersoon;
  var item = rp && rp instanceof Array && rp [0];

  dotest.test (err)
    .isObject ('fail', 'data', data)
    .isCondition ('fail', 'data.totalItemCount', data && data.totalItemCount, '>', 0)
    .isObject ('fail', 'data._embedded', data && data._embedded)
    .isArray ('fail', 'data._embedded.rechtspersoon', rp)
    .isNotEmpty ('fail', 'data._embbedded.rechtspersoon', rp)
    .isObject ('fail', 'data._embedded.rechtspersoon[0]', item)
    .isString ('fail', 'data._embedded.rechtspersoon[0].dossiernummer', item && item.dossiernummer)
    .done ();
}


dotest.add ('Module', function (test) {
  test ()
    .isFunction ('fail', 'exports', app)
    .isFunction ('fail', 'interface', openkvk)
    .done ();
});


dotest.add ('search by keyword', function () {
  openkvk ({ query: 'ahold' }, testArrayObject);
});


dotest.add ('search by dossier', function () {
  openkvk ('35030138', testArrayObject);
});


// Start the tests
dotest.run ();
