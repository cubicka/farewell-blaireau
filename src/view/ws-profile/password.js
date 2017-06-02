import React from 'react'
import {WithLoading} from '../components/button'
import Om from '../om'
import style from './info.css'

function Password({id, isChangingPassword, isEdit, username, password, ChangePassword, Save, StartEdit, StopEdit}) {
    return(
        <div className={style.wrapper +' '+style.borderLeft}>
            <div className={style.marginLine}>
                <div className={style.head}>Kelola Password</div>
                <div>
                    <div className={style.title}>
                        Username
                    </div>
                    <div className={style.info} style={{marginBottom: 5}}>
                        {username}
                    </div>
                </div>
                {
                    !isEdit &&
                    <div>
                        <div className={style.title}>
                            Password
                        </div>
                        <div className={style.info} style={{marginBottom: 5}}>
                            **********
                        </div>
                        <div className={style.chngePassBtn} onClick={StartEdit}>Ganti Password</div>
                    </div>
                }
                {
                    isEdit &&
                    <div>
                        <div className={style.title}>
                            Password Baru
                        </div>
                        <div className={style.info} style={{marginBottom: 5}}>
                            <input type={'password'} className={style.password} value={password} onChange={ChangePassword} />
                        </div>
                        <WithLoading isLoading={isChangingPassword} text={'Simpan'} className={style.chngePassBtn} onClick={Save(id)} />
                        <div className={style.chngePassBtn + ' ' + style.btnBatal} onClick={StopEdit}>Batal</div>
                    </div>
                }
            </div>
        </div>
    )
}

const states = {
    isEdit: '/ws/isEditPassword',
    isChangingPassword: '/ws/isChangingPassword',
    password: '/ws/password',
}

const actions = {
    ChangePassword: (e) => (['/ws/update', {payload: {password: e.target.value}}]),
    Save: (id) => () => (['ws/changePassword', id]),
    StartEdit: () => (['/ws/update', {payload: {isEditPassword: true, password: ''}}]),
    StopEdit: () => (['/ws/update', {payload: {isEditPassword: false}}]),
}

export default Om(states, actions)(Password)
