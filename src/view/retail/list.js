import React from 'react'
import Om from '../om'
import Icon from 'react-fontawesome'
import style from './list.css'

function User({user, ToDetail}) {
    return (
        <div className={style.row} onClick={ToDetail(user.get('userID'))}>
            <span className={style.colSKU}>{user.get('shop')}</span>
            <span className={style.colName}>{user.get('address')}</span>
            <span className={style.colSKU}>{'0' + user.get('phone')}</span>
            <span className={style.colPrice1}>{user.getIn(['city', 'Name'])}</span>
            <span className={style.colPrice1}>{user.getIn(['state', 'Name'])}</span>
        </div>
    )
}

function List({count, currentPage, isFetching, limit, list, name, total, EditFilter, NextPage, PrevPage, ToDetail}) {
    const usersRendered = list.map((user) => {
        return <User key={user.get('id')} user={user} ToDetail={ToDetail} />
    })

    const totalPage = Math.ceil(count/limit)
    return (
        <div className={style.wrapper}>
            <span className={style.title}>
                List Retailer
                {
                    isFetching &&
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                }
            </span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>Nama Toko</span>
                    <span className={style.colName}>Alamat</span>
                    <span className={style.colSKU}>No. Telp</span>
                    <span className={style.colPrice1}>Kota</span>
                    <span className={style.colPrice1}>Provinsi</span>
                </div>
                <div className={style.body}>{usersRendered}</div>
            </div>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} onClick={PrevPage} />
                <span className={style.note}>Page {currentPage} of {totalPage}</span>
                <Icon name={'angle-double-right'} className={style.left} onClick={NextPage} />
                <input type={'text'} placeholder={'SKU / Nama Item'} className={style.inputFilter} value={name} onChange={EditFilter} />
            </span>
        </div>
    )
}

const states = {
    list: "/retail/list",
    isFetching: '/retail/isFetching',
    count: '/retail/total',
    currentPage: '/retail/currentPage',
    limit: '/retail/limit',
    name: '/retail/name',
}

const actions = {
    NextPage: () => ([['/retail/nextPage'], ['retail/list']]),
    PrevPage: () => ([['/retail/prevPage'], ['retail/list']]),
    EditFilter: (e) => (['retail/editFilter', e.target.value]),
    ToDetail: (id) => () => (['push', `/retail-detail/${id}`])
}

export default Om(states, actions)(List)
