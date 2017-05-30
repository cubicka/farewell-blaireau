import React from 'react'
import Om from '../om'
import style from './header.css'

function MenuItem({text, isActive, ...rest}) {
    const styleName = isActive ? `${style.option} ${style.active}` : style.option
    return <li className={styleName} {...rest}>{text}</li>
}

const menus = [
    ['dashboard', 'Beranda'],
    ['ws', 'List WS'],
    // ['verifikasi', 'Verifikasi'],
    ['retail', 'List Retail'],
    ['sku', 'Manajemen SKU'],
]

function Header({header, PickHeader}) {
    const menusRendered = menus.map(([name, text]) => {
        return <MenuItem key={name} text={text} isActive={name === header} onClick={PickHeader(name)} />
    })

    return (
        <div className={style.wrapper}>
            <span className={style.title}>RULO</span>
            <ul className={style.menu}>{menusRendered}</ul>
        </div>
    )
}

const states = {
    header: "/page/header"
}

const actions = {
    PickHeader: (to) => () => [["push", `/${to}`]]
}

export default Om(states, actions)(Header)
