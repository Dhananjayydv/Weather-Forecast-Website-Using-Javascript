const iconelement  = document.querySelector(".weather-icon");
const tempelement = document.querySelector(".temperature");
const condelement = document.querySelector(".weather-condition");
const locationelement = document.querySelector(".location");
const notificationelement = document.querySelector(".weather-notification");

const weather={};
weather.temperature = {
    unit:"celsius"

}
const KELVIN = 273;
const key = "cb2c658049496ed2ae6883e92f8e4aff";


const successCallback = (position)=>{
    // console.log(position);
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    getweather(latitude,longitude);

}
const errorCallback = (error)=>{
    // console.log(error);
    notificationelement.style.display = "block";
    notificationelement.innerHTML=`<p>${error.message}</p>`;
   
}
navigator.geolocation.getCurrentPosition(successCallback,errorCallback);
function getweather(latitude,longitude){
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;

    console.log(api);
    fetch(api)
      .then(function(response){
        let data =response.json();
          return data;
      })
      .then(function(data){
         weather.temperature.value = Math.floor(data.main.temp - KELVIN);
         weather.description = data.weather[0].description;
         weather.iconId = data.weather[0].icon;
         weather.city = data.name;
         weather.country = data.sys.country;
      })
      .then(function(){
          displayweather();
      })
}
function displayweather(){
    iconelement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    tempelement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    condelement.innerHTML = weather.description;
    locationelement.innerHTML = `<p>${weather.city},${weather.country}</p>`
}
// </script>