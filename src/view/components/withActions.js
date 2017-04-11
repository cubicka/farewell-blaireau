import React, {Component} from 'react'
import {connect} from 'react-redux'

class WithActions extends Component {
    componentDidMount() {
        const {actions = []} = this.props
        actions.forEach((args) => {
            this.props.dispatch(args)
        })
    }
    render() {
        const {children} = this.props
        return (<div>{children}</div>)
    }
}

export default connect()(WithActions)
