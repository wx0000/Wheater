import React from "react";
import "./Result.css"

const Result = props => {
  const { err, date, city, sunrise, sunset, temp, pressure, wind } = props.weather;
  let content = null;
  
  if(!err && city){
      const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(sunset * 1000).toLocaleTimeString();

      content = (
          <>
        <h2>Aktualna pogoda dla miasta: <em>{city}</em></h2>
        <h4>dla daty i godziny: {date}</h4>
        <br/>
        <h4>Temperatura: {temp}&#176;</h4>
        <h4>Wschód słońca: {sunriseTime}</h4>
        <h4>Zachód słońca: {sunsetTime}</h4>
        <h4>Ciśnienie atmosferyczne: {pressure}hPa</h4>
        <h4>Prędkość wiatru: {wind}m/s</h4>
        </>
      )
  }
  return (
    <>
      <div className="result">
      {err ? `Brak danych dla miasta ${city}` : content}</div>
    </>
  );
};

export default Result;
