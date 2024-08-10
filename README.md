# Weather Forecasting App

![Weather Forecasting](./src/assets/logo.png)

## Overview

Welcome to the Weather Forecasting App, a responsive and stylish web application that provides real-time weather updates and a 6-day forecast for over 200,000 cities around the world. The app fetches weather data from the OpenWeatherMap API and presents it in a user-friendly interface.

### Live Demo

Check out the live version of the app: [Weather Forecasting App](https://tictactoewonderla.netlify.app)

## Features

- **Current Weather Data**: Get real-time weather conditions for any city, including temperature, humidity, wind speed, and more.
- **6-Day Forecast**: View a detailed weather forecast for the upcoming six days.
- **Responsive Design**: The app is fully responsive and works seamlessly across different screen sizes and devices.
- **Loading Animations**: Smooth loading animations to enhance the user experience.
- **Error Handling**: Displays appropriate error messages when something goes wrong (e.g., city not found, API issues).
- **Stylish UI**: A modern and visually appealing user interface with animations and transitions.

## Technologies Used

- **React.js**: A JavaScript library for building user interfaces.
- **MUI (Material-UI)**: A React component library that implements Google's Material Design.
- **OpenWeatherMap API**: A service providing weather data, including current weather, forecasts, and historical data.
- **Netlify**: Hosting platform for modern web projects.

## Installation

To run the app locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/goswamiAnushka/weather_forecasting.git

## Getting Started

### Navigate to the Project Directory
```bash
cd weather_forecasting


bash
npm install

Add your OpenWeatherMap API key:

Open src/api/OpenWeatherService.js and replace "your_key_here" with your actual API key:

javascript

const WEATHER_API_KEY = "your_key_here";
Start the development server:

bash

npm start
The app will be running on http://localhost:3000.

FILE STRUCTURE:

src/
│
├── api/
│   └── OpenWeatherService.js  # Handles API calls to OpenWeatherMap
│
├── assets/
│   ├── logo.png               # App logo
│   └── splash-icon.svg        # Splash screen icon
│
├── components/
│   ├── Search/                # Search component for city input
│   ├── WeeklyForecast/        # Component for displaying weekly forecast
│   ├── TodayWeather/          # Component for displaying today's weather
│   └── Reusable/              # Reusable components like ErrorBox and UTCDatetime
│
├── utilities/
│   ├── DatetimeUtils.js       # Utility functions for date and time formatting
│   ├── DataUtils.js           # Utility functions for data processing
│   └── DateConstants.js       # Constants related to date descriptions
│
└── App.js                     # Main component that integrates everything

## Important Components

- **App.js**: The main component that integrates the search functionality, today's weather, and the weekly forecast.
- **Search Component**: Handles user input for city search and triggers the data fetching process.
- **TodayWeather Component**: Displays the current weather conditions for the selected city.
- **WeeklyForecast Component**: Shows the 6-day weather forecast with details for each day.
- **ErrorBox Component**: Handles the display of error messages when something goes wrong.

## API Integration

The app uses the **OpenWeatherMap API** to fetch weather data. Make sure to sign up for an API key and add it to your `.env` file as shown in the installation steps.

## Deployment

The app is deployed on **Netlify**. To deploy your own version:

1. Push your code to a GitHub repository.
2. Connect the repository to Netlify.
3. Configure the build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `build`
4. Deploy the site.

## Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.


