import React from 'react'
import {WithLoading} from '../components/button'
import Om from '../om'
import style from './info.css'

function Password({id, isChangingPassword, isEdit, password, ChangePassword, Save, StartEdit, StopEdit}) {
    return(
        <div className={style.wrapper +' '+style.borderLeft}>
            <div className={style.marginLine}>
                <div className={style.head}>Kelola Password</div>
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
    isEdit: '/retail/isEditPassword',
    isChangingPassword: '/retail/isChangingPassword',
    password: '/retail/password',
}

const actions = {
    ChangePassword: (e) => (['/retail/update', {payload: {password: e.target.value}}]),
    Save: (id) => () => (['retail/changePassword', id]),
    StartEdit: () => (['/retail/update', {payload: {isEditPassword: true, password: ''}}]),
    StopEdit: () => (['/retail/update', {payload: {isEditPassword: false}}]),
}

export default Om(states, actions)(Password)
