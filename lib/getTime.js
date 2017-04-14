"use strict";

var google_maps_apikey;

var getTimes = function getTimes(options = {}) {
  return new Promise((resolve, reject) => {
    google_maps_apikey = options.google_maps_apikey;

    let result = { address: options.address, google_maps_apikey: google_maps_apikey }
    let promises = [];
    promises.push(_call_google(`maps/api/geocode/json?address=${options.address}`).then(function(value) {
      result.geo_coords = value.results[0].geometry.location;
    }));

    promises.push(_get_dest_times(options).then(function(values) {
      result.destinations = values;
    }));

    Promise.all(promises).then(function(values) {
      console.log(JSON.stringify(result, null, 2)); // Print here for the CLI
      resolve(result);
    });
  });
}

function _get_dest_times(options) {
  return new Promise((resolve, reject) => {
    let result = {};
    let promises=[];
    for(let dest_key in options.destinations) {
      let dest = options.destinations[dest_key];
      result[dest_key] = {};
      promises.push(_get_drive_time(options.address, dest).then(function(gmap_result) {
        result[dest_key].distance = gmap_result.distance;
        result[dest_key].time = gmap_result.time;
      }));
    }
    Promise.all(promises).then(function(values) {
      resolve(result);
    });
  })
}

async function _get_drive_time(source, dest) {
  return new Promise((resolve, reject) => {
    _call_google(`maps/api/distancematrix/json?origins=${source}&destinations=${dest}&units=imperial`)
    .then(function(value) {
      let response = value.rows[0].elements[0];
      resolve({
        time: response.duration.text,
        distance: response.distance.text
      });
    });
  })
}

function _call_google(url) {
  return new Promise((resolve, reject) => {
    const lib = require('https');
    // console.log(`https://maps.googleapis.com/${url}&key=${google_maps_apikey}`);
    const request = lib.get(`https://maps.googleapis.com/${url}&key=${google_maps_apikey}`, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      // response.on('end', () => console.log(body.join('')));
      response.on('end', () => resolve(JSON.parse(body.join(''))));
    });
    request.on('error', (err) => reject(err))
  });
}

module.exports = getTimes;
