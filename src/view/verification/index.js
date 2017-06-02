import React from 'react'
import Page from '../components/pageWithHeader'
import WithActions from '../components/withActions'
import List from './list'
import style from './style.css'

function VerificationPage() {
    return (
        <WithActions actions={[['ws/verification']]}>
            <Page header={'verification'}>
                <div className={style.wrapper}>
                    <List />
                </div>
            </Page>
        </WithActions>
    )
}

export default VerificationPage
