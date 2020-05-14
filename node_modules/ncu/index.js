const time = require('./lib/time')
const weather = require('./lib/weather')
const bonus = require('./lib/bonus')

module.exports = {
    time,
    weather: weather.ncu,
    convert: weather.convert,
    weatherAtm: weather.ncuAtm,
    convertAtm: weather.convertAtm,
    bonus
}
