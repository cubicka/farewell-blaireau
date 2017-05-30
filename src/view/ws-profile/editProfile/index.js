import React from 'react'
import {connect} from 'react-redux'
import style from './style.css'
import Modal from '../../global/modal'
import Content from './content'


function Edit({}) {
    return( 
        <div className={style.wrapper}>
            <Content/>
            <Modal/>
        </div>
    )
}





export default (Edit)