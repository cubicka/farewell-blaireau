import React from 'react'
import Icon from 'react-fontawesome'

export function WithLoading({isLoading, text, loadingText, ...props}) {
    return (
        <div {...props}>
            {isLoading && <Icon name={'spinner'} className={'fa-spin'} style={{marginRight: 7}} />}
            {isLoading ? text : (loadingText || text)}
        </div>
    )
}
