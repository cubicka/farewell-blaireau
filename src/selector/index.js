import {Map} from 'immutable'

import signIn from './sign-in'
import sku from './sku'

const specs = {
    signIn, sku,
}

function GetDeep(paths) {
    return (state) => {
        const pathsSplitted = paths.split('/')
        return pathsSplitted.reduce((obj, path) => {
            if (path in obj) return obj[path]
            if (typeof obj.get !== "function") return Map()
            return obj.get(path, Map())
        }, state)
    }
}

export default function Subs(subscription) {
    const module = subscription.split('/')[0]
    const child = subscription.split('/').slice(1).join('/')

    if (module === "") {
        return GetDeep(child)
    }

    if (module in specs && child in specs[module]) {
        return specs[module][child]
    }

    return () => {}
}
