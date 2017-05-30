import React from 'react'
import Page from '../components/pageWithHeader'
import WithActions from '../components/withActions'
import Content from './content'

function ProfilePage(props) {
    return (
        <WithActions actions={[['misc/states'], ['/retail/clearInfo'], ['retail/profile', props.match.params.id]]}>
            <Page header={'retail'}>
                <Content/>
            </Page>
        </WithActions>
    )
}

export default ProfilePage
