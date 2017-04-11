import React from 'react'
import Page from '../components/pageWithHeader'
import EditForm from './editForm'
import EditImage from './editImage'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <Page header={'sku'} className={style.wrapper}>
            <div className={style.wrapper}>
                <EditForm />
                <EditImage />
                <List />
            </div>
        </Page>
    )
}

export default SKUPage
