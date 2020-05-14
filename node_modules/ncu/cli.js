#!/usr/bin/env node
console.log('NCU Real Time Weather is Running......')

const ncu = require('./index.js')

console.log(ncu.time())
ncu.weatherAtm().then(data => {
    console.log(ncu.convertAtm(data))
    console.log(ncu.bonus())
}).catch(err => {
    console.log(err.message)
    // console.log(err.stack)
})
