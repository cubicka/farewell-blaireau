import React from 'react'
import Page from '../components/pageWithHeader'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <Page header={'ws'}>
            <div className={style.wrapper}>
                <List />
            </div>
        </Page>
    )
}

export default SKUPage
