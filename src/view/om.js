import {connect} from 'react-redux'
import {IsArray} from 'kulakan/obj'
import Selector from '../selector'

function RecursiveDispatcher(dispatch) {
    function Rec(specs) {
        if (typeof specs === "function") {
            return (...args) => (Rec(specs(...args)))
        }

        return dispatch(specs)
    }

    return (initialSpecs) => {
        if(IsArray(initialSpecs)) {
            return () => Rec(initialSpecs)
        }

        return Rec(initialSpecs)
    }
}

export default (selectors = {}, specs = {}) => {
    function StateAccumulator(state, props) {
        const temp = Object.keys(selectors).reduce((accum, name) => {
            accum[name] = Selector(selectors[name])(state, props)
            return accum
        }, {})

        return temp
    }

    function DispatchAccumulator(dispatch) {
        const Dispatcher = RecursiveDispatcher(dispatch)
        return Object.keys(specs).reduce((accum, name) => {
            accum[name] = Dispatcher(specs[name])
            return accum
        }, {})
    }

    return connect(StateAccumulator, DispatchAccumulator)
}
