openkvk
=======

Onofficiële node.js module voor [OpenKvK](http://openkvk.nl/).

[![Build Status](https://travis-ci.org/fvdm/nodejs-openkvk.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-openkvk)


Installatie
-----------

Stable: `npm install openkvk`

Source: `npm install fvdm/nodejs-openkvk`


Gebruik
-------

```js
var openkvk = require('openkvk')

// basis gegevens
openkvk( 'ahold', console.log )

// zoek op KvK nummer
openkvk( 12345, console.log )
```


### Basis gegevens

```js
[ { rechtspersoon: 'Ahold Kunst Stichting',
    vestigingsnummer: '000014453061',
    adres: 'Provincialeweg 11',
    kvk: '350301380000',
    handelsnamen: { bestaand: [Object] },
    postcode: '1506MA',
    type: 'Hoofdvestiging',
    kvks: '35030138',
    woonplaats: 'Zaandam' } ]
```


Unlicense
---------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
