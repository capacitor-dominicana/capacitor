const request = require('request')
const cheerio = require('cheerio')

const ncu = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://www.ncu.edu.tw',
            method: 'GET'
        }, (err, response, body) => {
            if (err || !body) {
                const errMsg = `Whoops! Please check your network connection. OR may be http://www.ncu.edu.tw is dead, error message:\n\n${err}\n`
                return reject(new Error(errMsg))
            }

            // paring data
            let $ = cheerio.load(body)
            let weatherHtml = $('.text01').text()
            if (!weatherHtml) {
                return reject(new Error('Whoops! The program is outdate, cann\'t get things from http://www.ncu.edu.tw\n'))
            }

            // ref: http://stackoverflow.com/questions/17374893/how-to-extract-floating-numbers-from-strings-in-javascript
            let weatherArray = weatherHtml.match(/[+-]?\d+(\.\d+)?/g)
            let temperature = parseFloat(weatherArray[0])
            let precip = parseFloat(weatherArray[1]) || 0 // precipitation
            resolve({
                temperature,
                precip
            })
        })
    })
}

const convert = ({ temperature, precip }) => {
    let result = ''
    result += `Temperature: ${temperature} \u2103\n`
    result += `     PRECIP: ${precip} mm/hr\n\n`
    result += suggestion(temperature, precip)
    return result
}

const ncuAtm = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://pblap.atm.ncu.edu.tw/indexReal_cam.asp',
            headers: {
                Cookie: 'pblapframeaction=8920%2D1259%2D7714'
            }
        }, (err, response, body) => {
            if (err || !body) {
                const errMsg = `Whoops! Please check your network connection. OR may be http://pblap.atm.ncu.edu.tw is dead, error message:\n\n${err}\n`
                return reject(new Error(errMsg))
            }

            let $ = cheerio.load(body)
            let weatherHtml = $('#realcamvalue').text()
            if (!weatherHtml) {
                return reject(new Error('Whoops! The program is outdate, cann\'t get things from http://pblap.atm.ncu.edu.tw\n'))
            }

            let weatherArray = weatherHtml.match(/[+-]?\d+(\.\d+)?/g)
            resolve({
                temperature: parseFloat(weatherArray[0]), // C
                relativeHumidity: parseFloat(weatherArray[1]), // %
                windDirection: parseFloat(weatherArray[2]), // degree
                windSpeed: parseFloat(weatherArray[3]), // m/s
                pressure: parseFloat(weatherArray[4]), // hPa
                precip: parseFloat(weatherArray[5]) || 0 // mm/hr
            })
        })
    })
}

const convertAtm = ({ temperature, relativeHumidity, windSpeed, precip }) => {
    let apparentTemperature = getApparentTemperature({ temperature, relativeHumidity, windSpeed })
    let result = ''
    result += `Apparent Temperature: ${apparentTemperature.toFixed(1)} \u2103\n`
    result += `         Temperature: ${temperature} \u2103\n`
    result += `              PRECIP: ${precip} mm/hr\n\n`
    result += suggestion(apparentTemperature, precip)
    return result
}

function getApparentTemperature ({ temperature, relativeHumidity, windSpeed }) {
    // Water Pressure(hPa)
    let waterPressure = (relativeHumidity / 100) * 6.105 * Math.exp((17.27 * temperature) / (237.7 + temperature))
    let apparentTemperature = (1.04 * temperature) + (0.2 * waterPressure) - (0.65 * windSpeed) - 2.7
    return apparentTemperature
}

function suggestion (temperature, precip) {
    let suggest = ''
    if (temperature < 20) {
        suggest += '\u{1F455}  Remember to dress warmly\n'
    }
    if (precip > 0) {
        suggest += "\u2602  Don't forget to take your umbrella\n"
    }
    return suggest
}

module.exports = {
    ncu,
    convert,
    ncuAtm,
    convertAtm
}
