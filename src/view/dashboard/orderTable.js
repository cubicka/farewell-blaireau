import React from 'react'
import style from './orderTable.css'

function OrderTable() {
    return (
        <div className={style.wrapper}>
            <span className={style.title}>Order Terkini</span>
            <div className={style.header}>
                <span className={style.colNama}>Nama Customer</span>
                <span className={style.colWaktu}>Waktu</span>
                <span className={style.colTotal}>Total</span>
                <span className={style.colStatus}>Status</span>
            </div>
            <div className={style.body}>
                <div className={style.row}>
                    <span className={style.colNama}>Toko Agus Khan</span>
                    <span className={style.colWaktu}>1 jam yang lalu</span>
                    <span className={style.colTotal}>2.500.000</span>
                    <span className={style.colStatus}>Diterima</span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Toko Sabar Abadi</span>
                    <span className={style.colWaktu}>3 jam yang lalu</span>
                    <span className={style.colTotal}>900.000</span>
                    <span className={style.colStatus}>Diproses</span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Toko Agus Khan</span>
                    <span className={style.colWaktu}>1 hari yang lalu</span>
                    <span className={style.colTotal}>2.500.000</span>
                    <span className={style.colStatus}>Diproses</span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Toko Ayuh Cerah</span>
                    <span className={style.colWaktu}>2 hari yang lalu</span>
                    <span className={style.colTotal}>2.500.000</span>
                    <span className={style.colStatus}>Diproses</span>
                </div>
                <div className={style.row}>
                    <span className={style.colNama}>Toko Kiki Sumiarti</span>
                    <span className={style.colWaktu}>2 hari yang lalu</span>
                    <span className={style.colTotal}>2.500.000</span>
                    <span className={style.colStatus}>Diproses</span>
                </div>
            </div>
        </div>
    )
}

export default OrderTable
