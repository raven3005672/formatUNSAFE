
function getType(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

function formatUNSAFE(target, format) {
    let tType = getType(target);
    let fType = getType(format);
    switch (fType) {
        case 'Object':
            if (tType !== fType) {
                target = {};
            }
            for (let key in format) {
                target[key] = formatUNSAFE(target[key], format[key]);
            }
            return target;
        case 'Array':
            if (tType !== fType) {
                target = [];
                return target;
            }
            if (format.length === 0) {
                return target;
            }
            target = target.map(function (value, key) {
                if (key < format.length) {
                    value = formatUNSAFE(value, format[key]);
                } else {
                    value = formatUNSAFE(value, format[0]);
                }
                return value;
            });
            return target;
        case 'String':
        case 'Number':
            return tType === fType ? target : format;
        case 'Undefined':
        case 'Null':
            return tType === fType ? format : target;
        default:
            return undefined;
    }
}

export default formatUNSAFE;