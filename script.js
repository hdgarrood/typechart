
function selectOnChange(event) {
    const newValue = event.target.value 
    setDisplay({
        "atk-super-effective": getKeys(2, attackingTypeEffectiveness[newValue]),
        "atk-not-very-effective": getKeys(0.5, attackingTypeEffectiveness[newValue]),
        "def-super-effective": getKeys(2, defendingTypeEffectiveness[newValue]),
        "def-not-very-effective": getKeys(0.5, defendingTypeEffectiveness[newValue]),
    })
}

function setDisplay(values) {
    ["atk-super-effective", "atk-not-very-effective", "def-super-effective", "def-not-very-effective"].forEach(x => {
        document.getElementById(x).innerText = values[x].join(", ")
    })
}

function setNested(path, obj, value) {
    for (el of path.slice(0, path.length - 1)) {
        if (!obj.hasOwnProperty(el)) {
            obj[el] = {}
        }
        obj = obj[el]
    }
    obj[path[path.length - 1]] = value
}

function getKeys(value, obj) {
    const result = []
    for (key in obj) {
        if (obj[key] === value) {
            result.push(key)
        }
    }
    return result
}

document.getElementById('type-1-select').addEventListener('change', selectOnChange)

const attackingTypeEffectiveness = {
    "Normal": {
        "Rock": 0.5,
        "Ghost": 0,
        "Steel": 0.5
    },
    "Fire": {
        "Fire": 0.5,
        "Water": 0.5,
        "Grass": 2,
        "Ice": 2,
        "Bug": 2,
        "Rock": 0.5,
        "Dragon": 0.5,
        "Steel": 2
    },
    "Water": {
        "Fire": 2,
        "Water": 0.5,
        "Grass": 0.5,
        "Ground": 2,
        "Rock": 2,
        "Dragon": 0.5,
    }
}

const defendingTypeEffectiveness = (function() {
    const result = {}
    for (atkType in attackingTypeEffectiveness) {
        for (defType in attackingTypeEffectiveness[atkType]) {
            setNested([defType, atkType], result, attackingTypeEffectiveness[atkType][defType])
        }
    }
    return result
})()