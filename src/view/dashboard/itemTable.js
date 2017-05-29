import React from 'react'
import {GetAttrs, ToPrice, ToTitleCase} from 'kulakan/util'
import style from './itemTable.css'

function Item({item}) {
    const {name, unit, totalPrice} = GetAttrs(item, ['name', 'unit', 'totalPrice'])

    return (
        <div className={style.row}>
            <span className={style.colNama}>{ToTitleCase(name)}</span>
            <span className={style.colUnit}>{ToTitleCase(unit)}</span>
            <span className={style.colHarga}>{ToPrice(totalPrice)}</span>
        </div>
    )
}

function ItemTable({items}) {
    const itemsRendered = items.map((item, idx) => (<Item key={idx} item={item} />))
    return (
        <div className={style.wrapper}>
            <span className={style.title}>Item Terlaris</span>
            <div className={style.header}>
                <span className={style.colNama}>Nama Item</span>
                <span className={style.colUnit}>Satuan</span>
                <span className={style.colHarga}>Harga</span>
            </div>
            <div className={style.body}>
                {itemsRendered}
            </div>
        </div>
    )
}

export default ItemTable
