/*
Name:         openkvk
Description:  node.is module to access the OpenKvK.nl webservice.
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Unlicense (Public Domain) - see LICENSE file
              (https://github.com/fvdm/nodejs-openkvk/raw/master/LICENSE)
*/

var httpreq = require ('httpreq');


/**
 * Process httpreq response
 *
 * @callback callback
 * @param err {Error, null} - Client error
 * @param res {object} - Client response details
 * @param callback {function) - `function (err, data) {}`
 * @returns {void}
 */

function httpResponse (err, res, callback) {
  var data = res && res.body || null;
  var error = null;

  if (err) {
    callback (err);
    return;
  }

  try {
    data = JSON.parse (data);
  } catch (e) {
    error = new Error ('not json');
    error.error = e;
    error.body = data;
    error.statusCode = res.statusCode;

    callback (error);
    return;
  }

  callback (null, data);
}


/**
 * Send API request
 *
 * @callback callback
 * @param term {string} - Term to lookup
 * @param callback {function) - `function (err, data) {}`
 * @returns apiRequest {function}
 */

function apiRequest (term, callback) {
  var options = {
    method: 'GET',
    url: 'http://officieel.openkvk.nl/json/' + encodeURIComponent (term),
    header: {
      'User-Agent': 'openkvk.js (https://www.npmjs.com/package/openkvk'
    }
  };

  httpreq.doRequest (options, function (err, res) {
    httpResponse (err, res, callback);
  });

  return apiRequest;
}

module.exports = apiRequest;
