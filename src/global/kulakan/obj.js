export function IsArray(arr) {
    return (Object.prototype.toString.call(arr) === '[object Array]')
}

export function ProjectObj(attrs) {
    return (obj) => {
        return attrs.reduce((accum, attr) => {
            accum[attr] = obj[attr]
            return accum
        }, {})
    }
}

export function ExpandObjs(_objs, expansion) {
    const objs = IsArray(_objs) ? _objs : [_objs]
    return objs.map((obj) => (Object.assign({}, obj, expansion)))
}

export function ArrToObj(arr, identityFn) {
    return arr.reduce((accum, obj) => {
        accum[identityFn(obj)] = obj
        return accum
    }, {})
}

export function ProjectArr(arr, ids, identityFn = (x) => (x)) {
    const filteredArr = arr.filter((obj) => (ids.indexOf(identityFn(obj)) > -1))
    const obj = ArrToObj(filteredArr, identityFn)
    return ids.map((id) => (obj[id]))
}

export function Compose(fn, ...fns) {
    return (...args) => {
        return fns.reduce((accum, nextFn) => (nextFn(accum)), fn(...args))
    }
}