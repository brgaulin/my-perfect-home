# My Perfect Home
Simple web UI to help you find your perfect home based on travel times to work/family

## Main Function get_times()
### Input
A US street address in json
```javascript
{
  "address": "1 Main St. Boston, MA 12345",
  "google_maps_apikey": "23iuy1h2u3h1i2i12u3ui21h3i"
}
```

### Output
JSON Payload
```javascript
{
  "destinations": {
    "work1": {
      "distance": 11.6, // Distance in Miles
      "time_arrive_9am": 72, // Time in minutes from input, to work1 if you were to arrive at 9am
      "time_arrive_1pm": 45, // Time in minutes from input, to work1 if you were to arrive at 1pm
      "time_depart_5pm": 72 // Time in minutes from work1, to input if you were to depart at 5pm
    },
    "work2": {
      "distance": 13,
      "time_1pm": 47,
      "time_arrive_9am": 82,
      "time_arrive_1pm": 57,
      "time_depart_5pm": 65
    },
    "nearest_train": { // TBD, for now uses standard google search
      "distance": 4,
      "time_arrive_8am": 15
    }
  },
  "satellite_view": "https://maps.google.com/sat.jpg",
  "address": "1 Main St. Boston, MA 12345"
}
```

## Configuring
A simple config file of google map search commands, ex.
```json
{
  "work1": {
    "search_term": "My work, Cambridge, MA",
    "times": {
      "arrival": ["9am", "1pm"],
      "depart": ["5pm"]
    }
  }
}
```
## WebUI
Wraps this function, displays the satellite view and times in a human readable format

## Contributes
1. Fork the Project
2. Push up changes and pull request
3. Contributor review and processing
