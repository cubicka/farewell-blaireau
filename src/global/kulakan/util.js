export function FnsCreator(dicts, defaultReturn) {
    return (events, ...args) => {
        if (events in dicts) {
            return dicts[events](...args)
        }

        return defaultReturn;
    }
}

export function GetAttrs(immutableObj, attrs) {
    if (!immutableObj || typeof immutableObj.get !== 'function') {
        return []
    }

    return attrs.reduce((accum, attr) => {
        accum[attr] = immutableObj.get(attr)
        return accum
    }, {})
}
