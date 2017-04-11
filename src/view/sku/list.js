import React from 'react'
import Icon from 'react-fontawesome'
import style from './list.css'

function SKU() {
    return (
        <div className={style.wrapper}>
            <span className={style.title}>SKU List</span>
            <div className={style.listWrapper}>
                <div className={style.header}>
                    <span className={style.colSKU}>SKU</span>
                    <span className={style.colName}>Nama Item</span>
                    <span className={style.colPrice1}>DIST</span>
                    <span className={style.colPrice2}>SRO</span>
                    <span className={style.colPrice3}>KANV</span>
                </div>
                <div className={style.body}>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096004'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild - 16s'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096055'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild - 12s'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096066'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096077'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096088'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096099'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096111'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096122'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096133'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                    <div className={style.row}>
                        <span className={style.colSKU}>{'8999909096144'}</span>
                        <span className={style.colName}>{'Sampoerna A Mild 16'}</span>
                        <span className={style.colPrice1}>{'13.608'}</span>
                        <span className={style.colPrice2}>{'13.689'}</span>
                        <span className={style.colPrice3}>{'13.800'}</span>
                    </div>
                </div>
            </div>
            <span className={style.pagination}>
                <Icon name={'angle-double-left'} className={style.left} />
                <span className={style.note}>Page 1 of 7</span>
                <Icon name={'angle-double-right'} className={style.left} />
            </span>
        </div>
    )
}

export default SKU
