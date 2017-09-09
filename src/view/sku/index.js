import React from 'react'
import WithActions from '../components/withActions'
import Page from '../components/pageWithHeader'
import EditForm from './editForm'
import EditImage from './editImage'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <WithActions actions={[["sku/list"], ["sku/images"], ["sku/categories"]]}>
            <Page header={'sku'} className={style.wrapper}>
                <div className={style.wrapper}>
                    <EditForm />
                    <EditImage />
                    <List />
                </div>
            </Page>
        </WithActions>
    )
}

export default SKUPage
