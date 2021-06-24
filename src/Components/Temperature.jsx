import { get } from "http";
import React, { useState } from "react";
import "./Temperature.css";
var cityName;
var currentTemp;
var iconcode;
var iconurl = "http://openweathermap.org/img/w/10D.png";

function getWeatherObject(callback) {
  const URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=559340dd86fcb83340111729e6240a0e&units=metric";
  get(URL, (res) => {
    res.on("data", (d) => {
      callback(JSON.parse(d));
    });
  }).on("error", (e) => {
    console.error(e);
  });
}
function inputChangeHandler(event){
cityName=event.target.value;
}

function TemperatureCard() {
  const [temp, setTemperature] = useState(0);
  function buttonClickhandler() {
    getWeatherObject((weatherData) => {
      currentTemp = weatherData.main.temp;
      setTemperature(currentTemp);
      iconcode = weatherData.weather[0].icon;
      iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
    });
  }
  return (
    <div className="card">
      <img src={iconurl} className="card-img-top" alt="SomeImage"></img>
      <div className="card-body">
        <h5 className="card-title"> {temp}°C</h5>
        <p className="card-text"> {cityName} </p>
      </div>
      <div>
          <h4>Enter City Name</h4>
        <input type="text" onChange={inputChangeHandler}></input>
      </div>
      <button onClick={buttonClickhandler} className="btn btn-primary">
        GET WEATHER
      </button>
    </div>
  );
}
export default TemperatureCard;
