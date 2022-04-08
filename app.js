window.addEventListener('load', () => {
  let long;
  let lat;

  let Day = document.querySelectorAll('.date h3')

  let maxTemps = document.querySelectorAll('.max-temp h3');
  let minTemps = document.querySelectorAll('.min-temp h3');
  let Pop = document.querySelectorAll('.pop h3');
  let Weather = document.querySelectorAll('.weather-icon img');

  //位置情報の取得
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // 経度取得
      long = position.coords.longitude;
      //緯度取得
      lat = position.coords.latitude;

      //天気予報取得
      const api = `http://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${long}&APPID=b1cddf18b74a84dd57b7e3c23fe0ccff`;

      // 非同期通信 = リクエストを送信し、レスポンスを受け取るまでも他の操作が可能
      //fetch = 外部のデータ取得
      fetch(api)
      .then(response => {
        //jsonデータとして返す
        return response.json();
      })
      .then(data => {
        console.log(data);
        const Daily = data.daily;

        //最高気温
        for (let i = 0; i < Daily.length; i++) {
          const {max} = Daily[i].temp;
          maxTemps[i].textContent = Math.floor(max);
        };

        // 最低気温
        for (let i = 0; i < Daily.length; i++) {
          const {min} = Daily[i].temp;
          minTemps[i].textContent = Math.floor(min);
        };

        //降水確率
        for (let i = 0; i < Daily.length; i++) {
          const {pop} = Daily[i];
          Pop[i].textContent = pop * 100;
        };

        // 天気アイコン
        for (let i = 0; i < Daily.length; i++) {
          const {description} = Daily[i].weather[0];
          console.log(description);
          if (description === "clear sky") {
            Weather[i].src = "./svg/day.svg";
          } else if (description === "rain and snow" || description === "light snow") {
            Weather[i].src = "./svg/cloudy-day-1.svg";
          } else if (description === "broken clouds") {
            Weather[i].src = "./svg/cloudy.svg";
          } else if (description === "light rain") {
            Weather[i].src = "./svg/rainy-2.svg";
          }
        };

        // 日付
        // const date = new Date (data.current.dt * 1000);
        // date.setHours(date.getHours() + 9);
        // const month = date.getMonth() + 1;
        // const day = month + '/' + date.getDate();

        for (let i = 1; i <= Daily.length; i++) {
          const date = new Date (data.current.dt * 1000);
          date.setHours((date.getHours() + 9)*[i]);
          const month = date.getMonth() + 1;
          const day = month + '/' + date.getDate();

          Day[i-1].textContent = day;
        }
        // for (let i = 0; i < Daily.length; i++) {
        //   Day[i].textContent = month + "/" + tomorrow;
        // };

      });
    });
  };
});





// window.addEventListener("load", () => {
//   let long;
//   let lat;
//   let temperatureDescription = document.querySelector('.temperature-description');
//   let temperatureDegree = document.querySelector('.temperature-degree');
//   let locationTimezone = document.querySelector('.location-timezone');
//   let locationIcon = document.querySelector('.location-icon');
//   let temperatureSection = document.querySelector('.degree-section')
//   const temperatureSpan = document.querySelector('.degree-section span')

//   //位置情報の取得
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(position => {
//       //経度取得
//       long = position.coords.longitude;
//       //緯度取得
//       lat = position.coords.latitude;

//       //プロキシ接続
//       // const proxy = "url";
//       // const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=b1cddf18b74a84dd57b7e3c23fe0ccff`;

//       // API取得
//       //天気予報
//       const api = `http://api.openweathermap.org/data/2.5/onecall?units=metric&lat=${lat}&lon=${long}&APPID=b1cddf18b74a84dd57b7e3c23fe0ccff`;
//       //現在の天気
//       // const api = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=34.3976714&lon=132.4731899&APPID=b1cddf18b74a84dd57b7e3c23fe0ccff`;
//       // const api = `http://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${long}&APPID=b1cddf18b74a84dd57b7e3c23fe0ccff`;

//       //非同期通信 = リクエストを送信し、レスポンスを受け取るまでも他の操作が可能
//       //fetch = 外部のデータ取得
//       fetch(api)
//       .then(response => {
//         //jsonデータとして返す
//         return response.json();
//       })
//       .then(data => {
//         console.log(data);
//         const { temp } = data.main;
//         const { description } = data.weather[0];
//         const { main } = data.weather[0];

//         // set dom elements form the api
//         temperatureDegree.textContent = temp;
//         temperatureDescription.textContent = description;
//         locationTimezone.textContent = data.timezone;

//         //華氏→摂氏変換
//         // let celsius = (temp - 32) * (5 / 9);

//         //天気アイコン表示
//         if (main == "Clear") {
//           locationIcon.src = "./svg/wi-day-sunny.svg";
//         } else if (main == "Clouds") {
//           locationIcon.src = "./svg/wi-cloud.svg";
//         } else {
//           locationIcon.src = "";
//         }

//         // temperatureSection.addEventListener('click', ()=> {
//         //   if (temperatureSpan.textContent === "F") {
//         //     temperatureSpan.textContent = "℃";
//         //     temperatureDegree.textContent = Math.floor(celsius);
//         //   } else {
//         //     temperatureSpan.textContent = "F";
//         //     temperatureDegree.textContent = temp;
//         //   }

//         // })

//       });
//     });
//   }
// });
