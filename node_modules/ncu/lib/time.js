const printWeekday = () => {
    // enums week day and print it
    const weekday = new Array(7)
    weekday[0] = 'Sunday'
    weekday[1] = 'Monday'
    weekday[2] = 'Tuesday'
    weekday[3] = 'Wednesday'
    weekday[4] = 'Thursday'
    weekday[5] = 'Friday'
    weekday[6] = 'Saturday'
    let d = new Date()
    let time = `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()} ${weekday[d.getDay()]}`
    return time + ' UTC+8:00\n'
}

module.exports = printWeekday
