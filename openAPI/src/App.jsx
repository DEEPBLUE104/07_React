import React, { useEffect, useState } from "react";
import "./ex17.css";
import axios from "axios";

const Ex17 = () => {
  let cityList = ["gwangju", "seoul", "busan"];

  const [icon, setIcon] = useState();
  const [city, setCity] = useState("gwangju");
  const [temp, setTemp] = useState();
  const [cloud, setCloud] = useState();
  /** 내가 클릭한 도시를 가져오는 함수 */
  const getCity = (e) => {
    setCity(e.target.innerText);
  };

  /** 날씨 데이터를 가져오는 함수 */
  const getData = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=내앱키`;

    axios
      .get(url)
      // data 안에 들어가면 바로 활용 가능! json 변환 안 해줘도 됨
      .then((res) => {
        console.log("getData Function", res.data);
        setTemp(parseInt(res.data.main.temp - 273));
        setIcon(
          `https://openweathermap.org/img/wn/${res.data.weather[0].icon}@2x.png`
        );
        if (res.data.clouds.all > 90) {
          setCloud("매우 흐림");
        } else if (res.data.clouds.all > 60) {
          setCloud("흐림");
        } else {
          setCloud("맑음");
        }
      });
  };

  useEffect(() => {
    console.log("첫 화면 랜더링");
    getData();
    //첫화면 그리고 city가 바뀔때마다 랜더링(getData함수 실행!)
  }, [city]);

  return (
    <div className="weather-container">
      <div className="weather-item">
        <h1>오늘의 날씨🌎</h1>
        <div className="weather-data">
          <img src={icon} width="100px" />
          <h1>{temp}°C</h1>
          <h3>{city}</h3>
          <h4>{cloud}</h4>
        </div>
        <div>
          {cityList.map((item) => (
            <button onClick={getCity}>{item}</button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ex17;
