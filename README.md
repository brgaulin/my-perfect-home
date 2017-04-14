# My Perfect Home
Simple web UI to help you find your perfect home based on travel times to work/family

## Main Function getTimes()
### Input
A US street address in json.
```javascript
{
  "address": "1 Main St. Boston, MA 12345",
  "google_maps_apikey": "23iuy1h2u3h1i2i12u3ui21h3i",
  "destinations": {
    "work1": "My work, Cambridge, MA"
  }
}
```

### Output
JSON Payload
```javascript
{
  "destinations": {
    "work1": {
      "distance": "11.6 mi", // Distance in Miles
      "time": "1hr 12 min", // Time in minutes from input, to work1
    },
    "work2": {
      "distance": "13 mi",
      "time": "1hr 30 min",
    },
    "nearest_train": { // TBD, for now uses standard google search
      "distance": "4 mi",
      "time": "15 min"
    }
  },
  "geo_coords": {
    "lat": 1234,
    "lng": 1234
  },
  "address": "1 Main St. Boston, MA"
}
```

## WebUI
Wraps this function, displays the satellite view and times in a human readable format

## CLI
### Configuring the CLI
In the root folder create two files:
1. .google_maps_key and paste in your google maps api key
2. .destinations.json and setup your destinations, ex. {"work1": {}, "work2":{}}

### Running the CLI
```bash
node lib/cli.js "1 Main St. Boston, MA"
```

## Contributes
1. Fork the Project
2. Push up changes and pull request
3. Contributor review and processing

## TODO
Setup main.js as a webserver so we can pass the google key to the index.html
write index.html

## Important Note on Times
Google maps public API does not support asking for their predictive traffic at this time. So for the simplicity of this tool, its going to just show current travel times.
