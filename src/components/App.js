import React, { Component } from "react";
import "./App.css";
import Form from "./FormWeather";
import Result from "./Result";

//klucz API
const APIkey = "de3a2961c8243cd1d01e00c8b5ee3d0e";

class App extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: ""
  };


  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };


  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${
        this.state.value
      }&APPID=${APIkey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie znaleziono miasta");
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString();
          this.setState({
            err: false,
            date: time,
            city: this.state.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed
          });
        })
        .catch(err => console.log(err));
      this.setState({
        err: true,
        city: this.state.value
      });
    }
  }


  render() {
    return (
      <div className="App">
        <Form value={this.state.value} change={this.handleInputChange} />
        <Result weather={this.state} />
      </div>
    );
  }
}

export default App;
