require('should')
const bonus = require('../lib/bonus')

describe('#bonus()', () => {
    it('should be a string', () => {
        bonus().should.be.a.String // eslint-disable-line
    })
})
