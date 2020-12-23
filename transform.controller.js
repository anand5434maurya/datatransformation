const { json } = require("body-parser");

exports.transformData = function (payload, refData) {
    try {
        return getPayloadValue(payload, refData);
    } catch (error) {
        console.log("Error in controller file", err)
        throw new Error(error.message)
    }
}

function getPayloadValue(payload, refData) {
    payload.value.forEach(val => {
        if (val.valueType == 'string') {
            replaceValue(val, refData)
        } else {
            getPayloadValue(val, refData)
        }
    });
    return payload
}

function replaceValue(obj, refData) {
    if (obj.value.includes('REF')) {
        let strval = obj.value.split('{')
        let strval2 = strval[1].split('}')
        obj.value = refData[strval2[0]] + '' + strval2[1]
    }
}
