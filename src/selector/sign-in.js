import {createSelector} from 'reselect'
import {GetAttrs} from 'kulakan/util'

const form = createSelector(
    (state) => (state.signIn),
    (signIn) => {
        return GetAttrs(signIn, ['username', 'password', 'isLoading'])
    }
)

export default {
    form,
}
