import React from 'react'
import WithActions from '../components/withActions'
import Page from '../components/pageWithHeader'
import List from './list'
import style from './style.css'

function SKUPage() {
    return (
        <WithActions actions={[['retail/list']]}>
            <Page header={'retail'}>
                <div className={style.wrapper}>
                    <List />
                </div>
            </Page>
        </WithActions>
    )
}

export default SKUPage
