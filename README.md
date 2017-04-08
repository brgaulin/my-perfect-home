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
    "work1": {
      "search_term": "My work, Cambridge, MA",
      "times": {
        "arrival": ["9am", "1pm"],
        "depart": ["5pm"]
      }
    }
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
      "time_arrive_9am": 72, // Time in minutes from input, to work1 if you were to arrive at 9am
      "time_arrive_1pm": 45, // Time in minutes from input, to work1 if you were to arrive at 1pm
      "time_depart_5pm": 72 // Time in minutes from work1, to input if you were to depart at 5pm
    },
    "work2": {
      "distance": "13 mi",
      "time_1pm": 47,
      "time_arrive_9am": 82,
      "time_arrive_1pm": 57,
      "time_depart_5pm": 65
    },
    "nearest_train": { // TBD, for now uses standard google search
      "distance": "4 mi",
      "time_arrive_8am": 15
    }
  },
  "geo_coords": {
    "lat": 1234,
    "lng": 1234
  },
  "address": "1 Main St. Boston, MA 12345"
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
node lib/main.js "1 Main St. Boston, MA 12345"

## Contributes
1. Fork the Project
2. Push up changes and pull request
3. Contributor review and processing

## TODO
Setup main.js as a webserver so we can pass the google key to the index.html
write index.html
