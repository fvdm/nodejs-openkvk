#!/bin/bash
result=0

eslint openkvk.js test.js || result=1
istanbul cover test.js || result=1

if [ "$TRAVIS" == "true" ]; then
  cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js -v || result=1
fi

exit $result

