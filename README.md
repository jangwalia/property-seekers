## Property-Seekers
Find and list houses for sale or for rent.

## Usage
Geolocation
The listings use Google geocoding to get the coords from the address field. You need to either rename .env.example to .env and add your Google Geocode API key OR in the CreateListing.jsx file you can set geolocationEnabled to "false" and it will add a lat/lng field to the form.

## Run
npm start