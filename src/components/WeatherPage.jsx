import styles from '../App.module.css';

function WeatherPage({ weatherData, onLogout, onRefresh, loading, error }) {
  if (loading) {
    return <div className={styles.loading}>Загрузка погоды...</div>;
  }

  if (error) {
    return (
      <div className={styles.container}>
        <h2>Погода в Москве</h2>
        <div className={styles.error}>{error}</div>
        <button className={styles.button} onClick={onRefresh}>Обновить</button>
        <button className={{ ...styles.button, marginTop: 10 }} onClick={onLogout}>Выйти</button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2>Погода в Москве</h2>
      <button className={styles.button} onClick={onLogout}>Выйти</button>
      {weatherData && (
        <div className={styles.weather} id="weather">
          <p>Температура: {weatherData.main.temp.toFixed(1)}°C</p>
          <p>Погодные условия: {weatherData.weather[0].description}</p>
          <p>Скорость ветра: {weatherData.wind.speed} м/с</p>
          <button className={styles.button} onClick={onRefresh}>Обновить</button>
        </div>
      )}
    </div>
  );
}

export default WeatherPage;