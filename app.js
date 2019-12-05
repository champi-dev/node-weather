const yargs = require("yargs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const getForecast = (address) => geocode(address, (error, data) => {
  if (error) return console.log(error)
  const { latitude, longitude } = data
  console.log(data)

  forecast(latitude, longitude, (error, data) => {
    if (error) return console.log(error)
    console.log(data)
  })
})

yargs.command({
  command: "forecast",
  describe: "forecast",
  builder: {
    address: {
      describe: "address",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    getForecast(argv.address)
  }
})

yargs.parse()