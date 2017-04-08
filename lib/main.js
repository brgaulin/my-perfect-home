"use strict";

var fs = require('fs');
var google_maps_apikey;

function getTimes(options = {}) {
  return new Promise((resolve, reject) => {
    if(!options.address) {
      options.address = process.argv[2]
    }
    if(!options.google_maps_apikey) {
      options.google_maps_apikey = fs.readFileSync('./.google_maps_key').toString().trim();
    }
    google_maps_apikey = options.google_maps_apikey;
    if(!options.destinations) {
      options.destinations = JSON.parse(fs.readFileSync('./.destinations.json').toString());
    }
    console.log("Options:")
    console.log(options);
    let result = { address: options.address, google_maps_apikey: google_maps_apikey }
    let promises = [];
    promises.push(_call_google(`maps/api/geocode/json?address=${options.address}`).then(function(value) {
      result.geo_coords = value.results[0].geometry.location;
    }));

    promises.push(_get_dest_times(options).then(function(values) {
      result.destinations = values;
    }));

    Promise.all(promises).then(function(values) {
      console.log("Results:");
      console.log(result);
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
      if(dest.times.arrival) {
        dest.times.arrival.forEach(function(time){
          promises.push(_get_drive_time(options.address, dest, time, 'arrival').then(function(gmap_result) {
            result[dest_key].distance = gmap_result.distance;
            result[dest_key][gmap_result.name] = gmap_result.time;
          }));
        });
      }
      if(dest.times.depart) {
        dest.times.depart.forEach(function(time) {
          promises.push(_get_drive_time(options.address, dest, time, 'departure').then(function(gmap_result) {
            result[dest_key].distance = gmap_result.distance;
            result[dest_key][gmap_result.name] = gmap_result.time;
          }));
        });
      }
    }
    Promise.all(promises).then(function(values) {
      resolve(result);
    });
  })
}

async function _get_drive_time(address, dest, time, type) {
  return new Promise((resolve, reject) => {
    _call_google(`maps/api/distancematrix/json?origins=${address}&destinations=${dest.search_term}&units=imperial`).then(function(value) {
      let response = value.rows[0].elements[0];
      resolve({
        name: `time_${type}_${time}`,
        time: response.duration.text,
        distance: response.distance.text
      });
    });
  })
}

function _call_google(url) {
  return new Promise((resolve, reject) => {
    const lib = require('https');
    const request = lib.get(`https://maps.googleapis.com/${url}&key=${google_maps_apikey}`, (response) => {
      if (response.statusCode < 200 || response.statusCode > 299) {
         reject(new Error('Failed to load page, status code: ' + response.statusCode));
       }
      const body = [];
      response.on('data', (chunk) => body.push(chunk));
      response.on('end', () => resolve(JSON.parse(body.join(''))));
    });
    request.on('error', (err) => reject(err))
  });
}

getTimes();
