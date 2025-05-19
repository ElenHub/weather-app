import { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import WeatherPage from './components/WeatherPage';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (email, password) => {
     const apiKey = import.meta.env.VITE_REQRES_KEY;
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          setLoginError('Неверный логин или пароль');
        }
      })
      .catch(() => {
        setLoginError('Ошибка сети');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const fetchWeather = () => {
    setLoadingWeather(true);
    setError('');
      const apiKey = import.meta.env.VITE_WEATHER_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=${apiKey}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.cod === 200) {
          setWeatherData(data);
        } else {
          setError('Не удалось получить погоду.');
        }
      })
      .catch(() => {
        setError('Ошибка при загрузке погоды.');
      })
      .finally(() => {
        setLoadingWeather(false);
      });
  };

  useEffect(() => {
    if (token) {
      fetchWeather();
    }
  }, [token]);

  if (!token) {
    return <LoginPage onLogin={handleLogin} error={loginError} />;
  }

  return (
    <WeatherPage
      weatherData={weatherData}
      onLogout={handleLogout}
      onRefresh={fetchWeather}
      loading={loadingWeather}
      error={error}
    />
  );
}

export default App;