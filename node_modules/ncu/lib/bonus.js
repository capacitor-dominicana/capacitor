const fs = require('fs')
const path = require('path')

const bonus = () => {
    let data = fs.readFileSync(path.join(__dirname, 'faces.txt'), 'utf-8')
    let faces = data.toString().split('\n')
    let face = faces[Math.floor(Math.random() * faces.length)]
    return face
}

module.exports = bonus
