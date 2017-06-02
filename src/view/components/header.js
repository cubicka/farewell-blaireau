import React from 'react'
import WithActions from './withActions'
import Om from '../om'
import style from './header.css'

function MenuItem({text, isActive, ...rest}) {
    const styleName = isActive ? `${style.option} ${style.active}` : style.option
    return <li className={styleName} {...rest}>{text}</li>
}

function VerificationMenu({text, count, isActive, ...rest}) {
    const styleName = isActive ? `${style.option} ${style.active}` : style.option
    return (
        <li className={styleName + ' ' + style.verification} {...rest}>
            <span className={style.counter}>{count}</span>
            {text}
        </li>
    )
}

const menus = [
    ['dashboard', 'Beranda'],
    ['verification', 'Verifikasi'],
    ['ws', 'List WS'],
    ['retail', 'List Retail'],
    ['sku', 'Manajemen SKU'],
]

function Header({header, verification, PickHeader}) {
    const menusRendered = menus.map(([name, text]) => {
        if (name === "verification") return <VerificationMenu key={name} text={text} isActive={name === header} onClick={PickHeader(name)} count={verification} />
        return <MenuItem key={name} text={text} isActive={name === header} onClick={PickHeader(name)} />
    })

    return (
        <WithActions actions={[['ws/countVerification']]}>
            <div className={style.wrapper}>
                <span className={style.title}>
                    <img className={style.logo} src="/img/ruloLogo.png" alt="RULO" />
                </span>
                <ul className={style.menu}>{menusRendered}</ul>
            </div>
        </WithActions>
    )
}

const states = {
    header: "/page/header",
    verification: "/ws/verificationCount",
}

const actions = {
    PickHeader: (to) => () => [["push", `/${to}`]]
}

export default Om(states, actions)(Header)
