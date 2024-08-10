import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  SvgIcon,
  Typography,
  CircularProgress,
} from '@mui/material';
import Search from './components/Search/Search';
import WeeklyForecast from './components/WeeklyForecast/WeeklyForecast';
import TodayWeather from './components/TodayWeather/TodayWeather';
import { fetchWeatherData } from './api/OpenWeatherService';
import { transformDateFormat } from './utilities/DatetimeUtils';
import UTCDatetime from './components/Reusable/UTCDatetime';
import { ReactComponent as SplashIcon } from './assets/splash-icon.svg';
import Logo from './assets/logo.png';
import ErrorBox from './components/Reusable/ErrorBox';
import { ALL_DESCRIPTIONS } from './utilities/DateConstants';
import GitHubIcon from '@mui/icons-material/GitHub';
import {
  getTodayForecastWeather,
  getWeekForecastWeather,
} from './utilities/DataUtils';

function App() {
  const [todayWeather, setTodayWeather] = useState(null);
  const [todayForecast, setTodayForecast] = useState([]);
  const [weekForecast, setWeekForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const searchChangeHandler = async (enteredData) => {
    const [latitude, longitude] = enteredData.value.split(' ');

    setIsLoading(true);

    const currentDate = transformDateFormat();
    const date = new Date();
    let dt_now = Math.floor(date.getTime() / 1000);

    try {
      const [todayWeatherResponse, weekForecastResponse] =
        await fetchWeatherData(latitude, longitude);
      const all_today_forecasts_list = getTodayForecastWeather(
        weekForecastResponse,
        currentDate,
        dt_now
      );

      const all_week_forecasts_list = getWeekForecastWeather(
        weekForecastResponse,
        ALL_DESCRIPTIONS
      );

      setTodayForecast([...all_today_forecasts_list]);
      setTodayWeather({ city: enteredData.label, ...todayWeatherResponse });
      setWeekForecast({
        city: enteredData.label,
        list: all_week_forecasts_list,
      });
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  let appContent = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: '100%',
        minHeight: '400px',
        background: 'linear-gradient(135deg, #1d2671 0%, #c33764 100%)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.2)',
        animation: 'fadeIn 1.5s ease-in-out',
        '@keyframes fadeIn': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 150px)',
      }}
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{
          fontSize: { xs: '80px', sm: '100px', md: '120px' },
          color: '#ffffff',
          marginBottom: '1rem',
        }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: '14px', sm: '18px', md: '22px' },
          color: 'rgba(255, 255, 255, .95)',
          fontFamily: 'Poppins',
          textAlign: 'center',
          maxWidth: '80%',
          lineHeight: '1.4',
          animation: 'slideIn 2s ease-out',
          '@keyframes slideIn': {
            '0%': { transform: 'translateY(20px)', opacity: 0 },
            '100%': { transform: 'translateY(0)', opacity: 1 },
          },
        }}
      >
        Explore current weather data and a 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if (todayWeather && todayForecast && weekForecast) {
    appContent = (
      <Grid
        container
        spacing={2}
        sx={{
          width: '100%',
          margin: 0,
          overflow: 'hidden',
          maxHeight: 'calc(100vh - 150px)', // Adjust the height to fit within the viewport
        }}
      >
        <Grid item xs={12} md={6} sx={{ overflowY: 'auto', maxHeight: '100%' }}>
          <TodayWeather data={todayWeather} forecastList={todayForecast} />
        </Grid>
        <Grid item xs={12} md={6} sx={{ overflowY: 'auto', maxHeight: '100%' }}>
          <WeeklyForecast data={weekForecast} />
        </Grid>
      </Grid>
    );
  }

  if (error) {
    appContent = (
      <ErrorBox
        margin="3rem auto"
        flex="inherit"
        errorMessage="Something went wrong"
      />
    );
  }

  if (isLoading) {
    appContent = (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          minHeight: '400px',
        }}
      >
        <CircularProgress
          sx={{
            color: '#1d2671',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' },
            },
          }}
        />
        <Typography
          variant="h3"
          component="h3"
          sx={{
            fontSize: { xs: '14px', sm: '18px' },
            color: 'rgba(255, 255, 255, .9)',
            lineHeight: 1.5,
            fontFamily: 'Poppins',
            marginLeft: '1rem',
          }}
        >
          Loading...
        </Typography>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: { xs: '95%', sm: '85%', md: '1000px' },
        width: '100%',
        margin: '0 auto',
        padding: '1.5rem',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        borderRadius: '16px',
        boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.25)',
        animation: 'fadeSlide 2s ease-out',
        '@keyframes fadeSlide': {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        overflowY: 'auto', // Allow vertical scrolling if content overflows
        maxHeight: '100vh', // Ensure the container doesn't exceed the viewport height
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              width: '100%',
              marginBottom: '1.5rem',
              animation: 'popUp 1.5s ease-out',
              '@keyframes popUp': {
                '0%': { opacity: 0, transform: 'scale(0.8)' },
                '100%': { opacity: 1, transform: 'scale(1)' },
              },
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: '28px', sm: '38px', md: '48px' },
                width: 'auto',
                transition: 'transform 0.3s',
                '&:hover': {
                  transform: 'scale(1.1)',
                },
              }}
              alt="logo"
              src={Logo}
            />

            <UTCDatetime />
            <Link
              href="https://github.com/goswamiAnushka"
              target="_blank"
              underline="none"
              sx={{ display: 'flex' }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: '23px', sm: '27px', md: '31px' },
                  color: 'white',
                  '&:hover': { color: '#ff9800' },
                  transition: 'color 0.3s',
                }}
              />
            </Link>
          </Box>
          <Search onSearchChange={searchChangeHandler} />
        </Grid>
        {appContent}
      </Grid>
    </Container>
  );
}

export default App;
