import React, { useState } from "react";
import axios from "axios";
import sample from "../src/time-lapse-clouds.mp4"

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const date = new Date().toDateString();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=a36dca84a0002d88bc8fd59774f8fd91`;
  const imgURL = "https://openweathermap.org/img/wn/";

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        setLocation("");
      });
    }
  };
  return (
    
    <div className="min-h-screen">
      <video className="w-50" src={sample} autoPlay loop muted />
    <div className="absolute">
      
      <div class="max-w-md mx-auto">
        <div class="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
          <div class="grid place-items-center h-full w-12 text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            class="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
            type="text"
            value={location}
            placeholder="Enter City"
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
          />
        </div>
      </div>
      <h1 className="text-6xl font-bold font-normal leading-normal mt-4 mb-2 text-pink-800 text-center">
        Weather Forecast App
      </h1>
      <div class="mt-6 flex items-center justify-center">
        <div class="flex flex-col backdrop-blur-md bg-white/80 shadow-xl border-4 border-indigo-600/60 rounded-md p-4 w-full max-w-xs">
          <div class="font-bold text-3xl">{data.name}</div>
          <div class="text-sm text-gray-500">{date}</div>
          <div class="mt-3 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-34 w-34">
            {data.weather ? (
              <img
                src={imgURL + data?.weather[0]?.icon + "@2x.png"}
                alt="icon"
                class="h-35"
              />
            ) : null}
          </div>
          <div class="flex flex-row items-center justify-center mt-6">
            <div class="font-medium text-5xl">
              {data.main ? (
                <p>{Math.round(data.main.temp - 273.15)}°C</p>
              ) : null}
            </div>
            <div class="flex flex-col items-center ml-6">
              <div>{data.weather ? <p>{data?.weather[0]?.main}</p> : null}</div>
              <div class="mt-1">
                <span class="text-sm">
                  <i class="far fa-long-arrow-up"></i>
                </span>
                <span class="text-sm font-light text-gray-500">
                  {data.main ? (
                    <p>{Math.round(data.main.temp_min - 273.15)}°C</p>
                  ) : null}
                </span>
              </div>
              <div>
                <span class="text-sm">
                  <i class="far fa-long-arrow-down"></i>
                </span>
                <span class="text-sm font-light text-gray-500">
                  {data.main ? (
                    <p>{Math.round(data.main.temp_max - 273.15)}°C</p>
                  ) : null}
                </span>
              </div>
            </div>
          </div>
          <div class="flex flex-row justify-between mt-6">
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Wind</div>
              <div class="text-sm text-gray-500">{data?.wind?.speed}km/h</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Humidity</div>
              <div class="text-sm text-gray-500">{data?.main?.humidity}%</div>
            </div>
            <div class="flex flex-col items-center">
              <div class="font-medium text-sm">Visibility</div>
              <div class="text-sm text-gray-500">
                {data?.visibility / 1000}km
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  
  );
}

export default App;
