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

