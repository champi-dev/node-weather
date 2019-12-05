/* eslint-disable import/no-commonjs */
const request = require("request")

const celcius = (farenheit) => Math.round((farenheit - 32) * (5 / 9))

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/fcf11df1bd4eefcd9dc844eb3d16145a/${long},${lat}`

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback(error)
    }

    const { body } = response
    const { currently = {} } = body
    const { precipProbability, precipType, temperature } = currently

    callback(undefined, {
      precipProbability,
      precipType: precipType || '',
      temperature: celcius(temperature)
    })
  })
}

module.exports = forecast