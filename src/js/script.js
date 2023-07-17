// Variaveis
const apiKey = "73ce59d8d9c69a7c20347a40a5ce377b";

const cityIpunt = document.querySelector("#city-input");
const serachBTN = document.querySelector("#btn-search");

const cityElement = document.querySelector("#city ");
const tempElement = document.querySelector("#temperature span");
const descpElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const coutryElement = document.querySelector("#county");
const umidityElement = document.querySelector("#umidity span");
const windElement = document.querySelector("#wind span");


//Funções
function mudarBackground() {
    var dataAtual = new Date();
    var hora = dataAtual.getHours();
    var bodyElement = document.body;
    var containerElement = document.querySelector(".container");
    var imageElement = document.querySelector(".logo");
    var ptElement = document.querySelector(".pt");
    var nhElement = document.querySelector(".nh");
    var iconeElement = document.getElementById("icone");
    var weatherColor = document.getElementById("wather-container");
    var btnElement = document.getElementById("btn-search");
  
    if (hora >= 13 && hora < 18) {
      bodyElement.style.background =  "linear-gradient(to top,  #ffa500 100%, #ffffff 5%)";
      containerElement.style.backgroundColor ="linear-gradient(to top,  #ffa500 100%, #ffffff 5%)";
      imageElement.src = "./src/img/nuvemsol_png.png";
      ptElement.innerText = "Boa Tarde";
      nhElement.innerText="Puranga Karuka";
      btnElement.style.background = "linear-gradient(to top,  #ffa500 100%, #ffffff 5%)";
      btnElement.border = "2px solid rgba(255, 255, 255,1)";
    } else if (hora >= 1 && hora <13){
        bodyElement.style.background = "linear-gradient(to top, rgba(89, 76, 238, 1) 0%, #8dd0f8 100%)";       
        containerElement.style.backgroundColor = "linear-gradient(to top, rgba(89, 76, 238, 1)";
        imageElement.src = "./src/img/nuvemsol_png.png";
        ptElement.innerText = "Bom Dia";
        nhElement.innerText="Puranga Ara";
        iconeElement.href = "./src/img/nuvemsol_png.png";
        btnElement.style.background = "#8dd0f8";
        btnElement.border = "";
    }
    else {
      bodyElement.style.background = "linear-gradient(to top, #111111 3%, #333433 100%)"; // Gradiente escuro
      containerElement.style.backgroundColor = "linear-gradient(to top, #111111 3%, #333433 100%)";
      imageElement.src = "./src/img/luanuvens.png";
      ptElement.innerText = "Boa Noite";
      nhElement.innerText="Puranga Pituna";
      iconeElement.href = "./src/img/luanuvens.png";
        btnElement.border = "";

    }
}
 
const getWeatherData = async(city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metrics&appid=${apiKey}&lang=pt_br`;

    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {
    const data = await getWeatherData(city);

    if (data.name === undefined){
        alert(`Por favor! Coloque o nome de um país conhecido, caso não lembre como se escreve, use uma região próxima`)
        return;
    } else {
        cityElement.innerText = `${data.name}`;
        tempElement.innerText = parseFloat((data.main.temp_min/10).toFixed(1)); 
        descpElement.innerText = `${data.weather[0].description}`.toLocaleUpperCase();
        weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
        coutryElement.src=`https://flagsapi.com/${data.sys.country}/flat/64.png`;
        umidityElement.innerText = `${data.main.humidity} %`;
        windElement.innerText = `${parseFloat(data.wind.speed)} Km`;
    }

}


//Eventos
serachBTN.addEventListener("click", (e) => {
    e.preventDefault();
    
    const city = cityIpunt.value.toUpperCase().trim();
    showWeatherData(city);
});

cityIpunt.addEventListener("keyup", (e) => {
    if (e.code === 'Enter'){
        var city = e.target.value;
        showWeatherData(city);
    }
})

mudarBackground();
setInterval(mudarBackground, 60000);
