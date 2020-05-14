require('should')
const time = require('../lib/time')

describe('#time()', () => {
    it('should be a string', () => {
        time().should.be.a.String // eslint-disable-line
    })
})
