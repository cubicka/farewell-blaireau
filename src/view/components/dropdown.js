import React, {Component} from 'react'
import Icon from 'react-fontawesome'
import Clickout from './clickOutside'
import style from './dropdown.css'

function Rendered({list, Do}) {
    return (
        <div className={style.row} onClick={Do}>{list} </div>
    )
}

class Dropdown extends Component {
    state = {
        isOpen: false,
    }
    close = () => {
        this.setState({isOpen: false})
    }
    open = () => {
        this.setState({isOpen: true})
    }
    pick = (name) => () => {
        this.props.Pick(name)
        this.close()
    }
    render() {
        const {isFetching, options, selected} = this.props

        // const filteredList = options.filter((list) => {
        //     return list.toLowerCase().includes(selected.toLowerCase().trim())
        // })
        
        const renderedList = options.map((x, id) => {
            return <Rendered key={id} list={x} Do={this.pick(x)}/>
        })

        return (
            <Clickout onClickOutside={this.close}>
                <span className={style.dropdownValue} onClick={this.open}>
                    {selected}
                    {
                        this.state.isOpen ?
                        <Icon name={'arrow-up'} className={style.arrow} /> :
                        <Icon name={'arrow-down'} className={style.arrow} />
                    }
                </span>
                {
                    this.state.isOpen &&
                    <div className={style.wrapper}>
                        {
                            isFetching &&
                            <div className={style.undefined}>
                                <Icon name={'spinner'} className={'fa-spin'} style={{marginRight: 10}} />
                                Mengambil data
                            </div>
                        }
                        {
                            !isFetching && renderedList.size > 0 &&
                            renderedList
                        }
                        {
                            !isFetching && renderedList.size === 0  &&
                            <div className={style.undefined}>Tidak Ditemukan</div>
                        }
                    </div>
                }
            </Clickout>
        )
    }
}

export default Dropdown
