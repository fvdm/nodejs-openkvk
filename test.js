/*
Name:         openkvk - test.js
Description:  Test script for openkvk.js
Source:       https://github.com/fvdm/nodejs-openkvk
Feedback:     https://github.com/fvdm/nodejs-openkvk/issues
License:      Public Domain / Unlicense (see LICENSE file)
*/

var openkvk = require('./')
var errors = 0

process.on( 'exit', function() {
	if( errors === 0 ) {
		console.log('\nDONE, no errors.\n')
		process.exit(0)
	} else {
		console.log('\nFAIL, '+ errors +' error(s) occured!\n')
		process.exit(1)
	}
})

// query
console.log( 'Query on api.openkvk.nl:' )
console.log( '  SELECT * FROM kvk WHERE bedrijfsnaam LIKE \'Ahold%\' LIMIT 1' )

openkvk( 'SELECT * FROM kvk WHERE bedrijfsnaam LIKE \'Ahold%\' LIMIT 1', function( err, res ) {
	if( err ) {
		console.log( err, err.stack )
		errors++
	} else if( res[0].bedrijfsnaam.substring(0,5) !== 'Ahold' ) {
		console.log( 'res[0].bedrijfsnaam.substring(0,5) !== \'Ahold\'' )
		errors++
	}
})

// simple
console.log( 'Lookup on officieel.openkvk.nl:' )
console.log( '  ahold' )

openkvk( 'ahold', function( err, res ) {
	if( err ) {
		console.log( err, err.stack )
		errors++
	} else if( !~res[0].rechtspersoon.indexOf('Ahold') ) {
		console.log( '!~res[0].rechtspersoon.indexOf(\'Ahold\')' )
		errors++
	}
})
