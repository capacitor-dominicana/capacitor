require('should')
const weather = require('../lib/weather')

describe('weather', () => {
    describe('#ncu()', function () {
        this.timeout(5000)
        let ncu = weather.ncu()
        it('should be an object', () => {
            return ncu.should.finally.be.an.Object()
        })
        it('should have size 2', () => {
            return ncu.should.finally.have.size(2)
        })
        it('should have property temperature which is a number', () => {
            return ncu.should.finally.have.property('temperature').which.is.a.Number()
        })
        it('should have property precip which is a number', () => {
            return ncu.should.finally.have.property('precip').which.is.a.Number()
        })
    })
    describe('#convert()', () => {
        let data = {
            temperature: 0,
            precip: 0
        }
        it('should have  no warning 21, 0', () => {
            data.temperature = 21
            data.precip = 0
            weather.convert(data).should.equal('Temperature: 21 ℃\n     PRECIP: 0 mm/hr\n\n')
        })
        it('should have one warning 19, 0', () => {
            data.temperature = 19
            data.precip = 0
            weather.convert(data).should.equal('Temperature: 19 ℃\n     PRECIP: 0 mm/hr\n\n\u{1F455}  Remember to dress warmly\n')
        })
        it('should have one warning 21, 0.66', () => {
            data.temperature = 21
            data.precip = 0.66
            weather.convert(data).should.equal('Temperature: 21 ℃\n     PRECIP: 0.66 mm/hr\n\n\u2602  Don\'t forget to take your umbrella\n')
        })
        it('should have two warning 18, 3.66', () => {
            data.temperature = 18
            data.precip = 3.66
            weather.convert(data).should.equal('Temperature: 18 ℃\n     PRECIP: 3.66 mm/hr\n\n\u{1F455}  Remember to dress warmly\n\u2602  Don\'t forget to take your umbrella\n')
        })
    })
    describe('#ncuAtm()', function () {
        this.timeout(5000)
        let ncu = weather.ncuAtm()
        it('should be an object', () => {
            return ncu.should.finally.be.an.Object()
        })
        it('should have size 6', () => {
            return ncu.should.finally.have.size(6)
        })
        it('should have property temperature which is a number', () => {
            return ncu.should.finally.have.property('temperature').which.is.a.Number()
        })
        it('should have property relativeHumidity which is a number', () => {
            return ncu.should.finally.have.property('relativeHumidity').which.is.a.Number()
        })
        it('should have property windDirection which is a number', () => {
            return ncu.should.finally.have.property('windDirection').which.is.a.Number()
        })
        it('should have property windSpeed which is a number', () => {
            return ncu.should.finally.have.property('windSpeed').which.is.a.Number()
        })
        it('should have property pressure which is a number', () => {
            return ncu.should.finally.have.property('pressure').which.is.a.Number()
        })
        it('should have property precip which is a number', () => {
            return ncu.should.finally.have.property('precip').which.is.a.Number()
        })
    })
    describe('#convertAtm()', () => {
        const data = {
            temperature: 15,
            relativeHumidity: 66,
            windSpeed: 3.3,
            precip: 0.1
        }
        it('should be a string', () => {
            weather.convertAtm(data).should.be.a.String // eslint-disable-line
        })
    })
})
