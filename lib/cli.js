"use strict";
var options = {};
options.address = process.argv[2]

var fs = require('fs');
options.google_maps_apikey = fs.readFileSync('./.google_maps_key').toString().trim();
options.destinations = JSON.parse(fs.readFileSync('./.destinations.json').toString());

require('./getTime')(options);
