/*
Name:         openkvk
Description:  node.is module to access the OpenKvK.nl webservice.
Author:       Franklin van de Meent (https://frankl.in)
Source code:  https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Unlicense / Public Domain - see LICENSE file
              (https://github.com/fvdm/nodejs-openkvk/raw/master/LICENSE)
*/

var http = require('http')

module.exports = function( term, callback ) {
  // prevent multiple callbacks
  var complete = false
  function doCallback( err, res ) {
    if( !complete ) {
      complete = true
      callback( err, res )
    }
  }
  
  // build request
  var options = {
    host: 'officieel.openkvk.nl',
    path: '/json/'+ encodeURIComponent( term ),
    header: {
      'User-Agent': 'openkvk.js (https://www.npmjs.com/package/openkvk'
    }
  }

  var request = http.request( options )

  request.on( 'response', function( response ) {
    var data = []
    var size = 0
    
    response.on( 'data', function( ch ) {
      data.push( ch )
      size += ch.length
    })
    
    response.on( 'close', function() {
      doCallback( new Error('request dropped') )
    })
    
    response.on( 'end', function() {      
      data = new Buffer.concat( data, size ).toString('utf8').trim()
      try {
        data = JSON.parse( data )
        doCallback( null, data )
      }
      catch(e) {
        doCallback( nee Error('not json')
      }
    })
  })
  
  // request error
  request.on( 'error', function( error ) {
    var err = new Error('request failed')
    err.error = error
    doCallback( error )
  })
  
  // do it
  request.end()
}
