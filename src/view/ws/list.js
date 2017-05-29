import React from 'react'
import Icon from 'react-fontawesome'
import style from './list.css'

// function Item({item}) {
//     return (
//         <div className={style.row}>
//             <span className={style.colSKU}></span>
//             <span className={style.colName}></span>
//             <span className={style.colPrice1}></span>
//         </div>
//     )
// }

function List() {
    // const itemsRendered = list.map((item) => {
    //     return <Item key={item.get('id')} item={item} />
    // })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>WS User List</span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>SKU</span>
                    <span className={style.colName}>Nama Item</span>
                    <span className={style.colPrice1}>Harga</span>
                </div>
                <div className={style.body}></div>
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

export default List
