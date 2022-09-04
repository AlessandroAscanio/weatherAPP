const formSearch = document.querySelector('[data-js="change-location"]')
const timeIcon = document.querySelector('[data-js="time-icon"]')
const cityNameContainer = document.querySelector('[data-js="city-name"]')
const cityWeatherContainer = document.querySelector('[data-js="city-weather"]')
const cityTemperatureContainer = document
  .querySelector('[data-js="city-temperature"]')
const cardContainer = document.querySelector('[data-js="card"]')
let timeImg = document.querySelector('[data-js="time"]')

const createTemplateImg = WeatherIcon =>
  `<img src="./src/icons/${WeatherIcon}.svg">`

const removeClassDnone = () => {
  const isDnoneClassExistis = cardContainer.classList.contains('d-none')

  if (isDnoneClassExistis) {
    cardContainer.classList.remove('d-none')
  }
}

const insertTimeBackgroundImg = IsDayTime => {
  return IsDayTime
    ? timeImg.src = './src/day.svg'
    : timeImg.src = './src/night.svg'
}

const insertCityNameIntoPage = LocalizedName =>
  cityNameContainer.textContent = LocalizedName

const insertCityWeatherIntoPage = WeatherText =>
  cityWeatherContainer.textContent = WeatherText

const insertTemperatureIntoPage = Temperature =>
  cityTemperatureContainer.textContent = Temperature

const insertTimeIconIntoPage = imgIcon => timeIcon.innerHTML = imgIcon

const insertCityWeatherInfosIntoPage = (IsDayTime, imgIcon, LocalizedName,
  WeatherText, Temperature) => {
  insertTimeBackgroundImg(IsDayTime)
  insertTimeIconIntoPage(imgIcon)
  insertCityNameIntoPage(LocalizedName)
  insertCityWeatherIntoPage(WeatherText)
  insertTemperatureIntoPage(Temperature.Metric.Value)
}

formSearch.addEventListener('submit', async event => {
  event.preventDefault()

  inputValue = event.target.city.value
  event.target.reset()

  const [{ Key, LocalizedName }] = await getCityData(inputValue)
  const [{ IsDayTime, Temperature, WeatherIcon, WeatherText }] = await
    getCityWeather(Key)

  const imgIcon = createTemplateImg(WeatherIcon)

  removeClassDnone()

  insertCityWeatherInfosIntoPage(IsDayTime, imgIcon, LocalizedName, WeatherText,
    Temperature)
})