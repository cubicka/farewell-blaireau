import React from 'react'
import Icon from 'react-fontawesome'
import {GetAttrs} from 'kulakan/util'
import Om from '../om'
import style from './list.css'

function Item({seller, ToDetail}) {
    const {shop, city, address, phone} = GetAttrs(seller, ['shop', 'city', 'address', 'phone'])

    return (
        <div className={style.row} onClick={ToDetail(seller.get('userID'))}>
            <span className={style.colSKU}>{shop}</span>
            <span className={style.colAddress}>{address}</span>
            <span className={style.colName}>{city.get('Name')}</span>
            <span className={style.colName}>{'0' + phone}</span>
        </div>
    )
}

function List({currentPage, isFetching, limit, list, name, count, EditFilter, NextPage, PrevPage, ToDetail}) {
    const itemsRendered = list.map((item) => {
        return <Item key={item.get('id')} seller={item} ToDetail={ToDetail} />
    })

    const totalPage = Math.ceil(count/limit)

    return (
        <div className={style.wrapper}>
            <span className={style.title}>
                WS User List
                {
                    isFetching &&
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                }
            </span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>Nama Toko</span>
                    <span className={style.colAddress}>Alamat</span>
                    <span className={style.colName}>Kota</span>
                    <span className={style.colName}>No Telp</span>
                </div>
                <div className={style.body}>{itemsRendered}</div>
            </div>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} onClick={PrevPage} />
                <span className={style.note}>Page {currentPage} of {totalPage}</span>
                <Icon name={'angle-double-right'} className={style.left} onClick={NextPage} />
                <input type={'text'} placeholder={'Nama Toko'} className={style.inputFilter} value={name} onChange={EditFilter} />
            </span>
        </div>
    )
}

const states = {
    isFetching: '/ws/isFetching',
    list: '/ws/list',
    count: '/ws/total',
    currentPage: '/ws/currentPage',
    limit: '/ws/limit',
    name: '/ws/name',
}

const actions = {
    EditFilter: (e) => (['ws/editFilter', e.target.value]),
    NextPage: () => ([['/ws/nextPage'], ['ws/ws']]),
    PrevPage: () => ([['/ws/prevPage'], ['ws/ws']]),
    ToDetail: (id) => () => (['push', `/ws-detail/${id}`])
}

export default Om(states, actions)(List)
