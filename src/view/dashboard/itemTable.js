import React from 'react'
import Icon from 'react-fontawesome'
import style from './itemTable.css'

function ItemTable() {
    return (
        <div className={style.wrapper}>
            <span className={style.title}>Item Terlaris</span>
            <div className={style.header}>
                <span className={style.colNama}>Nama Item</span>
                <span className={style.colUnit}>Satuan</span>
                <span className={style.colHarga}>Harga</span>
                <span className={style.colManage}>Manage</span>
            </div>
            <div className={style.body}>
                <div className={style.row}>
                    <span className={style.colNama}>Rokok Sampoerna</span>
                    <span className={style.colUnit}>Pack</span>
                    <span className={style.colHarga}>60.000</span>
                    <span className={style.colManage}>
                        <Icon name={'pencil'} className={style.editBtn} />
                        <Icon name={'close'} className={style.deleteBtn} />
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Rokok Sampoerna</span>
                    <span className={style.colUnit}>Bungkus</span>
                    <span className={style.colHarga}>12.000</span>
                    <span className={style.colManage}>
                        <Icon name={'pencil'} className={style.editBtn} />
                        <Icon name={'close'} className={style.deleteBtn} />
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Rokok Sampoerna</span>
                    <span className={style.colUnit}>Pack</span>
                    <span className={style.colHarga}>12.000</span>
                    <span className={style.colManage}>
                        <Icon name={'pencil'} className={style.editBtn} />
                        <Icon name={'close'} className={style.deleteBtn} />
                    </span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Rokok Sampoerna</span>
                    <span className={style.colUnit}>Pack</span>
                    <span className={style.colHarga}>12.000</span>
                    <span className={style.colManage}>
                        <Icon name={'pencil'} className={style.editBtn} />
                        <Icon name={'close'} className={style.deleteBtn} />
                    </span>
                </div>
            </div>
        </div>
    )
}

export default ItemTable
