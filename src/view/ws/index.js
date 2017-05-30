import React from 'react'
import Page from '../components/pageWithHeader'
import WithActions from '../components/withActions'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <WithActions actions={[['ws/ws']]}>
            <Page header={'ws'}>
                <div className={style.wrapper}>
                    <List />
                </div>
            </Page>
        </WithActions>
    )
}

export default SKUPage
