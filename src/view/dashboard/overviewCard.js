import React from 'react'
import style from './overviewCard.css'

function Logo({idx}) {
    const colors = ['#c9c3f6', '#a8dbbd', '#c3daf6', '#f6c3c3']
    return (<div style={{width: '84px', height: '84px', borderRadius: '42px', backgroundColor: colors[idx]}} />)
}

function OverviewCard({idx, val, label}) {
    return (
        <div className={style.wrapper}>
            <div className={style.logo}>
                <Logo idx={idx} />
            </div>
            <div className={style.note}>
                <div className={style.val}>{val}</div>
                <div className={style.label}>{label}</div>
            </div>
        </div>
    )
}

export default OverviewCard
