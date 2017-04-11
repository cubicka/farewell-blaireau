import {push} from 'react-router-redux'
import {Post} from 'kulakan/network'
import {GetAttrs} from 'kulakan/util'
import Storage from 'kulakan/storage'

function SignIn() {
    return (dispatch, getState) => {
        const state = getState()
        const {username, password, isLoading} = GetAttrs(state.signIn, ['username', 'password', 'isLoading'])

        if (isLoading) return
        if (!username || !password) {
            alert('Form harus diisi')
            return
        }

        dispatch(["/signIn/loading/start"])
        return Post('/auth/admin/sign-in', {username, password})
        .then((result) => {
            Storage.Save('token', result.token)
            dispatch(push("/dashboard"))
            dispatch(["/signIn/loading/end"])
        })
        .catch(() => {
            alert("Login gagal.")
            dispatch(["/signIn/loading/end"])
        })
    }
}

export default {
    signIn: SignIn,
}