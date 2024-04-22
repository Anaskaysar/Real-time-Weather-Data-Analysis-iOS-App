
# 💦 Real-time Weather Data Analysis iOS App in Serverless Computing Environments 

### Problem Statement

<p style="text-align:justify">
Accessing and analyzing real-time weather data on mobile platforms presents challenges due to resource limitations and network constraints. Efficiently integrating such data into iOS applications while ensuring timely updates and meaningful analysis is essential for various applications, including travel planning, outdoor activities, and emergency preparedness.
</p>

## 🛠 Technology Stack

- Language: JavaScript
- Ui Framewrok: React Native (Expo Cli)
- Google Cloud Serverless Functions For Realtime Weather Api Functionalties Integration

### Project Setup:

- Tailwind CSS for styling
- React Native Navigation
- React Native Hero Icons
- https://www.weatherapi.com/
- npm i react-native-progress

### Project Structure 

```
weather-app/
├── ios/
├── assets
├── src/
│   ├── api
│   │   └── Weather.js      # Main screen component
│   ├── components/
│   │   └── WeatherCard.js     # Component to display weather information
│   ├── screens/
│   │   ├── HomeScreen.js      # Container for HomeScreen component
│   └── theme/                 # Styling and theme configurations
├── App.js             # App entry point
├── navigation.js              # Navigation setup
├── package.json       # Node.js dependencies and scripts
└── README.md          # Project documentation
```
## Components

### `Weather.js`

Main screen component responsible for displaying weather information.

### `WeatherCard.js`

Component to display weather information in a card format.

## Screens

### `HomeScreen.js`

Container for the HomeScreen component.

## Theme

Styling and theme configurations are stored in the `theme/` directory.

## Entry Point

### `App.js`

The entry point of the app.

## Navigation

Navigation setup is stored in the `navigation.js` file.

## Dependencies

Check `package.json` for Node.js dependencies and scripts.

## Usage

To run the app, follow these steps:

1. Install dependencies: `npm install`
2. Start the app: `npm start`


## Google Cloud Serverless Functions

### Weather API Endpoints - 

- **Function Name:** `searchApi`
- **Description:** The api endpoint is triggered at the same same time user hit the search button for their desired weather location. When the Url is triggered the user will see weather information of that particular day and place.
- **Endpoint URL:** `https://us-central1-weatherapp-421018.cloudfunctions.net/searchApi?apiKey=${apiKey}&city=${params.cityName}`
- **Usage:**
  - To retrieve weather data on user requested search parameter, make a GET request to the above URL.
  - Example: `curl https://us-central1-weatherapp-421018.cloudfunctions.net/searchApi?apiKey=${apiKey}&city=${params.cityName}`


- **Function Name:** `forCastApi`
- **Description:** This serverless function provides weather forecast data of Next 7 days to the weather app frontend. The api endpoint is triggered at the same same time user hit the search button for their location. 
- **Endpoint URL:** `https://us-central1-weatherapp-421018.cloudfunctions.net/foreCastApi?apiKey=${apiKey}&city=${params.cityName}`
- **Usage:**
  - To retrieve weather data, make a GET request to the above URL.
  - Example: `curl https://us-central1-weatherapp-421018.cloudfunctions.net/foreCastApi?apiKey=${apiKey}&city=${params.cityName}`
- **Setup Instructions:**
  1. Deploy the function to Google Cloud Functions.
  2. Ensure proper authentication and authorization settings.
  3. Update the frontend code to fetch weather data from the provided URL.

