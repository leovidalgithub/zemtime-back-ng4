// verifies if obj is not an Array and returns an Array
let giveAnArray = (obj) => {
    return Array.isArray(obj) ? obj : obj = [obj];
}

module.exports = {
    giveAnArray: giveAnArray
}
