// @ts-check

/**
 * @param {string} newValue 
 */
function onTypeSelected(newValue) {
    if (isType(newValue)) {
        setDisplay({
            "atk-super-effective": getKeys(2, attackingTypeEffectiveness[newValue]),
            "atk-not-very-effective": getKeys(0.5, attackingTypeEffectiveness[newValue]),
            "atk-no-effect": getKeys(0, attackingTypeEffectiveness[newValue]),
            "def-super-effective": getKeys(2, defendingTypeEffectiveness[newValue]),
            "def-not-very-effective": getKeys(0.5, defendingTypeEffectiveness[newValue]),
            "def-no-effect": getKeys(0, defendingTypeEffectiveness[newValue]),
        })
    } else {
        console.error("Not a type:", newValue)
    }
}

/**
 * @param {{ [k: string]: Type[] }} values 
 */
function setDisplay(values) {
    for (const key in values) {
        const elt = document.getElementById(key)
        if (elt) {
            elt.innerText = values[key].join(", ")
        } else {
            console.error("couldn't find element:", key)
        }
    }
}


/**
 * @template {string} K
 * @template V
 * @param {V} value 
 * @param {{[k in K]?: V}} obj 
 * @returns {K[]}
 */
function getKeys(value, obj) {
    const result = []
    for (const key in obj) {
        if (obj[key] === value) {
            result.push(key)
        }
    }
    return result
}

const type1Select = document.getElementById('type-1-select')
if (type1Select instanceof HTMLSelectElement) {
    const newType = type1Select.value
    type1Select.addEventListener('change', (_event) => onTypeSelected(type1Select.value))
    onTypeSelected(type1Select.value)
}