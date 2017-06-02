import React from 'react'
import Om from '../om'
import {WithLoading as Button} from '../components/button'
import style from './style.css'

function Page({formData, EditPassword, EditUsername, SignIn}) {
    function OnKeyDown(e) {
        if (e.keyCode === 13) {
            SignIn()
        }
    }

    const {username, password, isLoading} = formData

    return (
        <div className={style.wrapper}>
            <div className={style.body}>
                <div className={style.container}>
                    <div className={style.title}>
                        <img className={style.logo} src={'/img/ruloBlue.png'} alt={'Rulo'} />
                    </div>
                    <form onKeyDown={OnKeyDown}>
                        <div className={style.inputWrapper}>
                            <label className={style.inputLabel}>Username</label>
                            <input type="text" value={username} onChange={EditUsername}/>
                        </div>
                        <div className={style.inputWrapper}>
                            <label className={style.inputLabel}>Password</label>
                            <input type="password" value={password} onChange={EditPassword} />
                        </div>
                        <Button className={style.primaryBtn} isLoading={isLoading} text={'MASUK'} onClick={SignIn} />
                    </form>
                </div>
            </div>
        </div>
    )
}

const states = {
    formData: "signIn/form",
}

const actions = {
    EditPassword: (e) => ["/signIn/password/edit", e.target.value],
    EditUsername: (e) => ["/signIn/username/edit", e.target.value],
    SignIn: ["signIn/signIn"],
}

export default Om(states, actions)(Page)
