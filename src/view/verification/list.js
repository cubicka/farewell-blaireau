import React from 'react'
import Icon from 'react-fontawesome'
import {GetAttrs} from 'kulakan/util'
import Om from '../om'
import style from './list.css'

function Item({isVerifying, seller, Terima, Tolak}) {
    const {name, shop, city, address, phone, state, userID} = GetAttrs(seller, ['name', 'shop', 'city', 'address', 'phone', 'state', 'userID'])

    return (
        <div className={style.itemWrapper}>
            <div className={style.info}><Icon name={'user-o'} className={style.icon} />{name}</div>
            <div className={style.info}><Icon name={'home'} className={style.icon} />{shop}</div>
            <div className={style.info}><Icon name={'map-marker'} className={style.icon} />{address}</div>
            <div className={style.info}><Icon name={'map-o'} className={style.icon} />{city.get('Name')} - {state.get('Name')}</div>
            <div className={style.info}><Icon name={'phone'} className={style.icon} />{'0' + phone}</div>
            {
                !isVerifying &&
                <span>
                    <span className={style.btn + ' ' + style.btnPos} onClick={Terima(userID)}>Terima</span>
                    <span className={style.btn + ' ' + style.btnNeg} onClick={Tolak(userID)}>Tolak</span>
                </span>
            }
            {
                isVerifying === 1 &&
                <span style={{color: '#4ea65f'}}>
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                    Sedang diproses
                </span>
            }
            {
                isVerifying === -1 &&
                <span style={{color: 'rgb(255, 100, 111)'}}>
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                    Sedang diproses
                </span>
            }
            {
                (isVerifying === 2 || isVerifying === -2) &&
                <span style={{color: isVerifying === 2 ? '#4ea65f' : 'rgb(255, 100, 111)'}}>
                    Pendaftaran {isVerifying === 2 ? 'diterima' : 'ditolak'}
                </span>
            }
        </div>
    )
}

function List({isFetching, isVerifying, list, Terima, Tolak}) {
    const itemsRendered = list.map((item) => {
        console.log('key', item.get('id'))
        return <Item seller={item} key={item.get('id')} isVerifying={isVerifying.get(item.get('userID').toString())} Terima={Terima} Tolak={Tolak} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>
                Verifikasi Pendaftaran WS
                {
                    isFetching &&
                    <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10, position: 'absolute', top: -10, left: -40}} />
                }
            </span>
            {
                list.size > 0 ?
                <div className={style.items}>
                    {itemsRendered}
                    <span style={{flex: '0 0 35%'}} />
                </div> :
                <div>Tidak ada pendaftaran baru</div>
            }
        </div>
    )
}

const states = {
    isFetching: '/ws/isFetching',
    list: '/ws/verificationList',
    isVerifying: '/ws/isVerifying',
}

const actions = {
    Terima: (id) => () => (['ws/verify', id, true]),
    Tolak: (id) => () => (['ws/verify', id, false]),
}

export default Om(states, actions)(List)
