import React from 'react'
import Item from './item'
import style from './list.css'

function SKU() {
    return (
        <div className={style.wrapper}>
            <Item isEdit={true} />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
            <div style={{flex: '1 0 auto', width: '280px', marginLeft: '20px'}} />
        </div>
    )
}

export default SKU
