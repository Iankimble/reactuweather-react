import React from "react";

/* Axios for making API call to open weather and giphy*/
import axios from "axios";

/* External stylesheet*/
import "./style/style.css";

import logo from "./style/logo.png";

class Api extends React.Component {
  state = {
    cityName: "",
    weatherDescription: "",
    weatherTemperature: "",
    weatherHighTemp: "",
    weatherLowTemp: "",
    gifImage: "",
    weatherCard: false,
    welcome: true
  };

  handleChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state.cityName);

    /* API "GET" request to Open weather API*/
    const weatherKey = process.env.REACT_APP_WEATHER_KEY;

    let city = this.state.cityName;
    let weatherURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      ",us&APPID=" +
      weatherKey +
      "&units=imperial";

    axios.get(weatherURL).then(data => {
      console.log(data);

      /** Variables for weather data */
      let temp = data.data.main.temp;
      let descript = data.data.weather[0].description;
      let humid = data.data.main.humidity;
      let high = data.data.main.temp_max;
      let low = data.data.main.temp_min;
      let gifTerm = "";
      console.log(temp + " " + descript + " " + humid + " " + high + " " + low);

      /** Conditional logic that transform the description into a search word for giphy */
      /** Only using most frequent weather descriptions */

      if (descript === "clear sky") {
        console.log("should read ... " + descript);
        gifTerm = "Beyonce";
      } else if (descript === "light rain") {
        console.log("should read ... " + descript);
        gifTerm = "Nick Cannon";
      } else if (descript === "overcast clouds") {
        console.log("should read ... " + descript);
        gifTerm = "Solange";
      } else if (descript === "few clouds") {
        console.log("should read..." + descript);
        gifTerm = "Beyonce";
      } else if (descript === "scattered clouds") {
        console.log("should read ... " + descript);
        gifTerm = "Nick Cannon";
      } else if (descript === "broken clouds") {
        console.log("should read ... " + descript);
        gifTerm = "Jay z";
      } else if (descript === "shower rain") {
        console.log("should read ... " + descript);
        gifTerm = "Solange";
      } else if (descript === "rain") {
        console.log("should read ... " + descript);
        gifTerm = "Nick Cannon";
      } else if (descript === "thunderstorm") {
        console.log("should read ... " + descript);
        gifTerm = "Beyonce";
      } else if (descript === "snow") {
        console.log("should read ... " + descript);
        gifTerm = "Solange";
      } else if (descript === "mist") {
        console.log("should read ... " + descript);
        gifTerm = "Nick Cannon";
      }

      /** Second API call for Giphy search */
      const giphyKey = process.env.REACT_APP_GIPHY_KEY;
      let gifSearchword = gifTerm;
      let giphyURL =
        "http://api.giphy.com/v1/gifs/search?q=" +
        gifSearchword +
        "&api_key=" +
        giphyKey;
      let gifResponse = "";

      /** GET request to Giphy API */
      axios.get(giphyURL).then(data => {
        console.log(data);

        /** Conditional logic that returns specific gif based on search word */
        /* Using limited terms for time purposes*/
        if (gifSearchword === "nick Cannon") {
          gifResponse = data.data.data[0].images.original.url;
          console.log(data.data.data[0].images.original.url);
        } else if (gifSearchword === "solange") {
          gifResponse = data.data.data[1].images.original.url;
          console.log(data.data.data[1].images.original.url);
        } else {
          gifResponse = data.data.data[2].images.original.url;
          console.log(data.data.data[2].images.original.url);
        }
        /* Setting state for new data */
        this.setState({
          weatherDescription: descript,
          weatherTemperature: temp,
          weatherHighTemp: high,
          weatherLowTemp: low,
          gifImage: gifResponse,
          cName: city,
          weatherCard: true,
          welcome: false
        });
      });
    });
  };

  render() {
    /* Passing data into variables that will be 'rendered' into divs*/
    let descriptData = this.state.weatherDescription;
    let tempData = this.state.weatherTemperature;
    let highData = this.state.weatherHighTemp;
    let lowData = this.state.weatherLowTemp;
    let gifData = this.state.gifImage;
    let c = this.state.cName;

    return (
      <div>
        <div id="formOne">
          <h2 id="header">Black-U-Weather</h2>
          <form onSubmit={this.handleSubmit} className="form">
            <label>
              Please search a U.S city:
              <input
                type="text"
                name="cityName"
                value={this.state.cityName}
                onChange={this.handleChange}
                className="formFeild"
              />
            </label>
            <div id="submit">
              <input
                type="submit"
                value="Submit"
                id="click"
                className="submitBtn"
              />
            </div>
          </form>
        </div>

        <div id="mainContainer" style={{ backgroundImage: `url(${gifData})` }}>
          {this.state.welcome ? (
            <div style={{ textAlign: "center" }}>
              <h2>React-U-Weather</h2>
              <img
                src={logo}
                style={{
                  height: "300px",
                  width: "300px",
                  alignSelf: "center",
                  paddingTop: "70px"
                }}
              />
            </div>
          ) : null}

          {this.state.weatherCard ? (
            <div id="weatherData">
              <h1 id="city">{c}</h1>
              <h2 id="forcast">
                <i>{descriptData}</i>
              </h2>
              <h2 id="mainTemp">{tempData}</h2>
              <h2 id="secondTemp">
                low: {highData} high: {lowData}
              </h2>
            </div>
          ) : null}
        </div>

        <div>
          <footer id="footer"> Ian Kimble &copy; 2019</footer>
        </div>
      </div>
    );
  }
}

export default Api;
