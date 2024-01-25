var rpn = require('request-promise-native')

const mapbox_static_address = "YOUR ADDRESS HERE"
const mapbox_api_token = "xxxxx"
const mapbox_url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(mapbox_static_address) + ".json?access_token=" + mapbox_api_token + "&limit=1"
const darksy_api_token = "xxxxx"



const asyncWeather = async () => {
    const coords = await rpn({url: mapbox_url, json: true})
    const lat = coords.features[0].center[1]
    const lon = coords.features[0].center[0]
    
    const coordinates = encodeURIComponent(lat + ',' + lon)
    const darksy_url = 'https://api.darksky.net/forecast/'+darksy_api_token+'/'+coordinates+'?units=si&lang=en'
    const forecast = await rpn({ url: darksy_url, json: true })

    return {
        currTemp: forecast.currently.temperature,
        currPercipProb: forecast.currently.precipProbability,
        daySummary: forecast.daily.data[0].summary,
        dayPercipProb: forecast.daily.data[0].precipProbability,
        dayTempLow: forecast.daily.data[0].temperatureLow,
        dayTempHigh: forecast.daily.data[0].temperatureHigh,
        dayHumidity: forecast.daily.data[0].humidity,
        dayWindSpeed: forecast.daily.data[0].windSpeed,
        dayWindGust: forecast.daily.data[0].windGust,
        dayCloudCover: forecast.daily.data[0].cloudCover,
        dayUvIndex: forecast.daily.data[0].uvIndex
    }

}

module.exports = {
    forecastExport: asyncWeather() //will return a promise, so in index.js use .then().catch()
    
}
//OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY //
//OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY OLD WAY //

//OLD WAY WITH PROMISE CHAINING. SUPER COOL BUT SUPER LONG AND CONFUSING
// const get_mapbox_coordinates = rpn({url: mapbox_url, json: true})
// .then(async (coords) => {
//     const latitude = coords.features[0].center[1]
//     const longitude = coords.features[0].center[0]
//     return {lat: latitude, lon: longitude}

// }).then(async ({lat, lon}) => {
//     const coordinates = encodeURIComponent(lat + ',' + lon)
//     const darksy_url = 'https://api.darksky.net/forecast/'+darksy_api_token+'/'+coordinates+'?units=si&lang=en'
//     return darksy_url

// }).then(async (darksy_url) => {
//     //We MUST return rpn otherwise we are not returning up the promise chain
//     const forecast = await rpn({ url: darksy_url, json: true })
//     return {
//         currTemp: forecast.currently.temperature,
//         currPercipProb: forecast.currently.precipProbability,
//         daySummary: forecast.daily.data[0].summary,
//         dayPercipProb: forecast.daily.data[0].precipProbability,
//         dayTempLow: forecast.daily.data[0].temperatureLow,
//         dayTempHigh: forecast.daily.data[0].temperatureHigh,
//         dayHumidity: forecast.daily.data[0].humidity,
//         dayWindSpeed: forecast.daily.data[0].windSpeed,
//         dayWindGust: forecast.daily.data[0].windGust,
//         dayCloudCover: forecast.daily.data[0].cloudCover,
//         dayUvIndex: forecast.daily.data[0].uvIndex
//     }
// }).catch((e) => {
//     console.log("Error retrieving forecast: " + e)
// })




