/*
Name:         openkvk
Description:  node.is module to access the OpenKvK.nl webservice.
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Unlicense (Public Domain) - see LICENSE file
              (https://github.com/fvdm/nodejs-openkvk/raw/master/LICENSE)
*/

var ovio = require ('overheid.io');
var kvk;

var config = {
  apikey: null,
  dataset: 'kvk',
  timeout: 5000
};


/**
 * Send API request
 *
 * @callback callback
 * @param path {string} - Term, id or 'id/subId'
 * @param callback {function) - `function (err, data) {}`
 * @returns apiRequest {function}
 */

function apiRequest (path, params, callback) {
  var options = {
    path,
    callback
  };

  if (typeof params === 'function') {
    callback = params;
    params = null;
  }

  options.params = params;
  kvk (options, callback);
  return apiRequest;
}


/**
 * Module setup and configuration
 *
 * @param set {object} - Config params
 * @param set.apikey {string) - Overheid.io API key
 * @param [set.timeout = 5000] {number} - Request timeout in ms
 * @returns apiRequest {function}
 */

function setup (set) {
  config.apikey = set.apikey || null;
  config.timeout = set.timeout || config.timeout;

  kvk = ovio (config);
  return apiRequest;
}

module.exports = setup;
