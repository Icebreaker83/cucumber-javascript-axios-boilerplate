#!/bin/bash
# Convenience script for running GPlay API tests.
#
# Parameters:
# $1 environment (test or stage)
# $2 and after are standard Cucumberjs parameters
#
# Usage examples:
# $ ./run.sh stage
# $ ./run.sh test
# $ ./run.sh stage features/<name>.feature
./node_modules/.bin/cucumber-js \
    --world-parameters "{\"environment\": \"$1\"}" \
    -p $1 \
    ${@:2}
