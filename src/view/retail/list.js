import React from 'react'
import Om from '../om'
import Icon from 'react-fontawesome'
import style from './list.css'

function User({user}) {
    return (
        <div className={style.row}>
            <span className={style.colSKU}>{user.get('name')}</span>
            <span className={style.colSKU}>{user.get('shop')}</span>
            <span className={style.colSKU}>{user.get('phone')}</span>
            <span className={style.colName}>{user.get('address')}</span>
            <span className={style.colPrice1}>{user.get('cityID')}</span>
            <span className={style.colPrice1}>{user.get('stateID')}</span>
        </div>
    )
}

function List({list}) {
    const usersRendered = list.map((user) => {
        return <User key={user.get('id')} user={user} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>List Retailer</span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>Nama</span>
                    <span className={style.colSKU}>Toko</span>
                    <span className={style.colSKU}>No. Telp</span>
                    <span className={style.colName}>Alamat</span>
                    <span className={style.colPrice1}>Kota</span>
                    <span className={style.colPrice1}>Provinsi</span>
                </div>
                <div className={style.body}>{usersRendered}</div>
            </div>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} onClick={() => {}} />
                <span className={style.note}>Page 1 of 7</span>
                <Icon name={'angle-double-right'} className={style.left} onClick={() => {}} />
                <input type={'text'} placeholder={'SKU / Nama Item'} className={style.inputFilter} value={''} onChange={() => {}} />
            </span>
        </div>
    )
}

const states = {
    list: "/retail/list"
}

export default Om(states)(List)
