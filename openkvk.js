var http = require('http')

module.exports = function( query, callback ) {
	// prevent multiple callbacks
	var complete = false
	function doCallback( err, res ) {
		if( !complete ) {
			complete = true
			callback( err, res )
		}
	}
	
	// build request
	if( query.substring(-1) !== ';' ) {
		query += ';'
	}
	
	query = encodeURIComponent( query )
	var options = {
		host: 'api.openkvk.nl',
		path: '/json/'+ query,
		header: {
			'User-Agent': 'openkvk.js (https://github.com/fvdm/nodejs-openkvk'
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
			// process response
			var buf = new Buffer( size )
			var pos = 0
			
			for( var d in data ) {
				data[d].copy( buf, pos )
				pos += data[d].length
			}
			
			data = buf.toString('utf8').trim()
			
			// really json?
			if( ! data.match( /^\[.*\]$/ ) ) {
				doCallback( new Error('not json') )
				return
			}
			
			data = JSON.parse( data )
			
			// clean up
			delete buf
			delete pos
			delete size
			
			// data structure
			var result = []
			var props = data[0].RESULT.HEADER
			
			for( var r in data[0].RESULT.ROWS ) {
				var row = data[0].RESULT.ROWS[r]
				var record = {}
				for( var i in row ) {
					record[ props[i] ] = row[i]
				}
				result.push( record )
			}
			
			// clean up
			delete result
			delete props
			
			// done
			doCallback( null, result )
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
