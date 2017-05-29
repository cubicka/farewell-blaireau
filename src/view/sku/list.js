import React from 'react'
import Om from '../om'
import Icon from 'react-fontawesome'
import {ToPrice, ToTitleCase} from 'kulakan/view'
import style from './list.css'

function Item({item}) {
    return (
        <div className={style.row}>
            <span className={style.colSKU}>{item.get('sku')}</span>
            <span className={style.colName}>{item.get('name')}</span>
            <span className={style.colPrice1}>{ToPrice(item.get('price'))}</span>
            <span className={style.colPrice2}>{ToTitleCase(item.get('category'))}</span>
        </div>
    )
}

function SKU({currentPage, filter, list, pageTotal, EditFilter, NextPage, PrevPage}) {
    const itemsRendered = list.map((item) => {
        return <Item key={item.get('id')} item={item} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>SKU List</span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>SKU</span>
                    <span className={style.colName}>Nama Item</span>
                    <span className={style.colPrice1}>Harga</span>
                    <span className={style.colPrice2}>Kategori</span>
                </div>
                <div className={style.body}>{itemsRendered}</div>
            </div>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} onClick={PrevPage} />
                <span className={style.note}>Page {currentPage} of {pageTotal}</span>
                <Icon name={'angle-double-right'} className={style.left} onClick={NextPage} />
                <input type={'text'} placeholder={'SKU / Nama Item'} className={style.inputFilter} value={filter} onChange={EditFilter} />
            </span>
        </div>
    )
}

const states = {
    filter: "/sku/view/list/filterKey",
    pageTotal: "/sku/view/list/pageNum",
    currentPage: "/sku/view/list/page",
    list: "sku/list"
}

const actions = {
    EditFilter: (e) => ['sku/editListFilter', e.target.value],
    NextPage: () => ['sku/nextListPage'],
    PrevPage: () => ['sku/prevListPage'],
}

export default Om(states, actions)(SKU)
