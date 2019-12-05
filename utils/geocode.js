/* eslint-disable import/no-commonjs */
const request = require("request")

const geocode = (addr, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(addr)}.json?access_token=pk.eyJ1IjoiZGFuaWVsc2FyY29yIiwiYSI6ImNrM3JxN2ZwaDA4NTczZW8yMXkwc3JzYjkifQ.ogkT45rQktU1uRjzc9k6Ow&limit=1`

  request({ url, json: true }, (error, res) => {
    if (error) {
      return callback(error)
    }

    const { body } = res
    const { features = [{}] } = body
    const { center, place_name } = features[0]

    callback(undefined, {
      latitude: center[0],
      longitude: center[1],
      location: place_name
    })
  })
}

module.exports = geocode