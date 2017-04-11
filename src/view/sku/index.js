import React from 'react'
import Page from '../components/pageWithHeader'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <Page header={'sku'} className={style.wrapper}>
            <div className={style.wrapper}>
                <div className={style.row}>
                    <span className={style.title}>SKU Manajemen</span>
                    <div className={style.menu} />
                </div>
                <div className={style.row}>
                    <List />
                </div>
            </div>
        </Page>
    )
}

export default SKUPage
