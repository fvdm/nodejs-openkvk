openkvk
=======

[![Greenkeeper badge](https://badges.greenkeeper.io/fvdm/nodejs-openkvk.svg)](https://greenkeeper.io/)

Node.js package for OpenKvK (unofficial)

[![npm](https://img.shields.io/npm/v/openkvk.svg?maxAge=3600)](https://github.com/fvdm/nodejs-openkvk/blob/master/CHANGELOG.md)
[![Build Status](https://travis-ci.org/fvdm/nodejs-openkvk.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-openkvk)
[![Dependency Status](https://gemnasium.com/badges/github.com/fvdm/nodejs-openkvk.svg)](https://gemnasium.com/github.com/fvdm/nodejs-openkvk#runtime-dependencies)
[![Coverage Status](https://coveralls.io/repos/github/fvdm/nodejs-openkvk/badge.svg?branch=master)](https://coveralls.io/github/fvdm/nodejs-openkvk?branch=master)


* [Node.js](https://nodejs.org)
* [OpenKvK](https://openkvk.nl) (Dutch)
* [Overheid.io](https://overheid.io) (Dutch)
* [API documentation](https://overheid.io/documentatie/kvk) (Dutch)


Example
-------

```js
var openkvk = require ('openkvk') ({
  apikey: 'abc123'
});

// Search on keyword
openkvk ({ query: 'ahold' }, console.log);

// Find by dossier ID - Output like search
openkvk ('12345', console.log);

// Find by subdossier ID - Output only details
openkvk ('58488340/0000', console.log);
```


Installation
------------

`npm install openkvk --save`


Configuration
-------------

The module setup function takes an object with these parameters:


param   | type   | required | default | description
:-------|:-------|:---------|:--------|:-----------
apikey  | string | yes      |         | Your [Overheid.io](https://overheid.io) API key
timeout | number | no       | 5000    | Request wait timeout in ms


#### Example

```js
var kvk = require ('openkvk') ({
  apikey: 'abc123',
  timeout: 8000
});
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

[Franklin van de Meent](https://frankl.in)

[![Buy me a coffee](https://frankl.in/u/kofi/kofi-readme.png)](https://ko-fi.com/franklin)
