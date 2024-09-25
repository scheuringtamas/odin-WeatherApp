const form = document.querySelector("form");
const changeUnit = document.getElementById("changeUnit");

let weatherData = null;
let measure = true;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await fetchData();
    displayCard();
    getLocation();
    getTemperature();
    getIcon();
    getDescription();
  } catch (error) {
    console.error("Error:", error.message);
  }
});

changeUnit.addEventListener("click", function () {
  const number = document.getElementById("number");
  const measureText = document.getElementById("measure");

  measure = !measure;
  if (!measure) {
    number.innerHTML = getFahrenheit() + "&deg";
    measureText.innerHTML = "F";
  } else {
    measureText.innerHTML = "";
    getTemperature();
  }
});

async function fetchData() {
  const locationID = document.getElementById("location").value;
  const response = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationID}?unitGroup=metric&key=CLVU9DJE8R66TNCV7J78WRXDB&contentType=json`
  );

  if (!response.ok) {
    throw new Error("The city cannot be found");
  }

  weatherData = await response.json();
  console.log(weatherData);
}

function getLocation() {
  const cardLocation = document.getElementById("cardLocation");
  cardLocation.innerHTML = weatherData.resolvedAddress;
}

function getTemperature() {
  const number = document.getElementById("number");
  const temperature = Math.round(weatherData.days[0].temp);
  number.innerHTML = temperature + "&deg;C";
  return temperature;
}

function getIcon() {
  let icon = document.getElementById("icon");
  let iconName = weatherData.days[0].icon;
  icon.src = `weatherIcons/${iconName}.png`;
}

function getDescription() {
  const description = document.getElementById("description");
  description.innerHTML = weatherData.days[0].description;
}

function getFahrenheit() {
  const fahrenheit = getTemperature() * (9 / 5) + 32;
  return Math.round(fahrenheit);
}

function displayCard() {
  const output = document.getElementById("displayContainer");
  let card = "";
  card += `
  <div id="container">
    <div class="card">
        <p id="cardLocation"></p>
        <div class="temperature">
            <p id="number"></p>
            <p id="measure"></p>
        </div>
        <img src="" alt="Weather icon" id="icon" />
        <p id="description"></p>
    </div>
</div>
  `;
  output.innerHTML = card;
}
