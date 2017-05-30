import React from 'react'
import Page from '../components/pageWithHeader'
import WithActions from '../components/withActions'
import Content from './content'

function ProfilePage(props) {
    return (
        <WithActions actions={[['misc/banks'], ['misc/states'], ['/ws/clearInfo'], ['ws/profile', props.match.params.id]]}>
            <Page header={'ws'}>
                <Content/>
            </Page>
        </WithActions>
    )
}

export default ProfilePage
