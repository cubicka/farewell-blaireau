import React from 'react'
import {GetAttrs, GetElapsedTime, GetOrderStatus, ToPrice} from 'kulakan/util'
import style from './orderTable.css'

function Order({order}) {
    const {buyer, totalPrice, created} = GetAttrs(order, ['buyer', 'totalPrice', 'created', 'accepted', 'delivered', 'cancelled'])
    const name = buyer.get('shop')
    const elapsedTime = GetElapsedTime(created)
    const status = GetOrderStatus(order)

    return (
        <div className={style.row}>
            <span className={style.colNama}>{name}</span>
            <span className={style.colWaktu}>{elapsedTime}</span>
            <span className={style.colTotal}>{ToPrice(totalPrice)}</span>
            <span className={style.colStatus}>{status}</span>
        </div>
    )
}

function OrderTable({orders}) {
    const ordersRendered = orders.map((order) => (<Order key={order.get('id')} order={order} />))

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
                {ordersRendered}
            </div>
        </div>
    )
}

export default OrderTable
