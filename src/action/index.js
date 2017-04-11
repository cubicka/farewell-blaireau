import {FnsCreator} from 'kulakan/util'
import {push} from 'react-router-redux'
import signIn from './signIn'

const specs = {
    signIn,
}

function ActionCreator(dicts) {
    return FnsCreator(dicts,() => ({ type: "nothing" }))
}

const Modules = Object.keys(specs).reduce((accum, spec) => {
    accum[spec] = ActionCreator(specs[spec])
    return accum
}, {})

export default function Actions(events, ...args) {
    const splitted = events.split('/')
    const module = splitted[0]
    const child = splitted.slice(1).join('/')

    // console.log('actions', events, '-', splitted, '-', module, '-', child, args)

    if (module === "") {
        return (dispatch) => (dispatch({type: child, payload: args[0]}))
    }

    if (module === "push") {
        return (dispatch) => (dispatch(push(args[0])))
    }

    if (module in specs) {
        return Modules[module](child, ...args)
    }

    return () => {}
}
