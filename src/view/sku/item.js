import React from 'react'
import Icon from 'react-fontawesome'
import style from './item.css'

function Item({isEdit}) {
    return (
        <div className={style.wrapper}>
            <div className={style.row}>
                <div className={style.photo} />
                <div className={style.nameWrapper}>
                    <div className={style.id}>Unique ID</div>
                    {
                        !isEdit ?
                        <div className={style.name}>Rokok Sampoerna</div> :
                        <div className={style.name}>
                            <input type={'text'} value={'Rokok Sampoerna'} onChange={() => {}} className={style.inputName} />
                        </div>
                    }
                </div>
            </div>
            <div className={style.row + ' ' + style.header + ' ' + (isEdit && style.headerEdit)}>
                <span className={style.colUnit}>Unit</span>
                <span className={style.colHarga}>Harga (Rp)</span>
                <span className={style.colAct}></span>
            </div>
            {
                isEdit ?
                <div className={style.row + ' ' + style.bodyEdit}>
                    <div className={style.colUnit}>
                        <input type={'text'} value={'Bungkus'} onChange={() => {}} className={style.inputUnit} />
                    </div>
                    <div className={style.colHarga}>
                        <input type={'text'} value={'8700'} onChange={() => {}} className={style.inputHarga} />
                    </div>
                    <span className={style.colAct}>
                        <Icon name={'trash'} className={style.deleteLine} />
                    </span>
                </div> :
                <div className={style.row + ' ' + style.body}>
                    <span className={style.colUnit}>Bungkus</span>
                    <span className={style.colHarga}>8700</span>
                    <span className={style.colAct}></span>
                </div>
            }
            {
                isEdit ?
                <div className={style.row + ' ' + style.bodyEdit}>
                    <span className={style.colUnit}>
                        <input type={'text'} value={'Slope'} onChange={() => {}} className={style.inputUnit} />
                    </span>
                    <span className={style.colHarga}>
                        <input type={'text'} value={'59000'} onChange={() => {}} className={style.inputHarga} />
                    </span>
                    <span className={style.colAct}>
                        <Icon name={'trash'} className={style.deleteLine} />
                    </span>
                </div> :
                <div className={style.row + ' ' + style.body}>
                    <span className={style.colUnit}>Slope</span>
                    <span className={style.colHarga}>59000</span>
                    <span className={style.colAct}></span>
                </div>
            }
            {
                isEdit &&
                <div className={style.row + ' ' + style.body}>
                    <span className={style.tambahUnit}>{'Tambah Unit'}</span>
                </div>
            }
            {
                isEdit ?
                <span>
                    <Icon name={'check'} className={style.check} />
                    <Icon name={'upload'} className={style.upload} />
                    <Icon name={'close'} className={style.close} />
                </span> :
                <span>
                    <Icon name={'pencil'} className={style.pencil} />
                    <Icon name={'trash'} className={style.trash} />
                </span>
            }
        </div>
    )
}

export default Item
