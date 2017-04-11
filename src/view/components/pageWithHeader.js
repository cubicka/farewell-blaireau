import React from 'react'
import WithActions from './withActions'
import Header from './header'

function PageWithHeader({header, children}) {
    return (
        <WithActions actions={[['/page/header/edit', header]]}>
            <Header />
            {children}
        </WithActions>
    )
}

export default PageWithHeader
