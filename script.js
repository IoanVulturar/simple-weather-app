const input = document.querySelector('.search-box input')
const button = document.querySelector('.search-box button')
const weatherBox = document.querySelector('.weather-box')
const weatherDetails = document.querySelector('.weather-details')

function getWeather() {
  const APIKEY = '80c47172b020022430a71ad01b1edd39'
  const searchLocation = input.value

  if (searchLocation === '') return

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&units=metric&appid=${APIKEY}`
  )
    .then((res) => {
      if (!res.ok) {
        throw Error(res.statusText)
      }
      return res.json()
    })
    .then((data) => {
      showWeather(data)
      console.log(data)
    })
    .catch((err) => {
      console.log(err)
      showNotFound()
    })
}

const notFound = document.querySelector('.not-found')
const notFoundLocation = document.querySelector('.not-found p span')

function showNotFound() {
  notFound.style.display = 'flex'
  weatherBox.style.display = 'none'
  weatherDetails.style.display = 'none'
  notFoundLocation.innerHTML = input.value
  input.value = ''
}

const searchedLocation = document.querySelector('.weather-box h1')
const img = document.querySelector('.weather-box img')
const temperature = document.querySelector('.temperature')
const description = document.querySelector('.description')
const humidity = document.querySelector('.humidity-details span')
const windSpeed = document.querySelector('.wind-details span')

function showWeather(data) {
  searchedLocation.innerHTML = data.name
  img.src = getImage(data.weather[0].main)
  temperature.innerHTML = `
    ${parseInt(data.main.temp)}<span class="degrees">°C</span>
  `
  description.innerHTML = `${data.weather[0].description}`
  humidity.innerHTML = `${data.main.humidity}%`
  windSpeed.innerHTML = `${data.wind.speed} km/h`

  notFound.style.display = 'none'
  weatherBox.style.display = 'flex'
  weatherDetails.style.display = 'flex'
  input.value = ''
}

function getImage(img) {
  switch (img) {
    case 'Clouds':
      return 'images/cloud.png'
    case 'Clear':
      return 'images/clear.png'
    case 'Mist':
      return 'images/mist.png'
    case 'Rain':
      return 'images/rain.png'
    case 'Snow':
      return 'images/snow.png'
    case 'Thunderstorm':
      return 'images/storm.png'
    default:
      return ''
  }
}

button.addEventListener('click', getWeather)
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    getWeather()
  }
})
