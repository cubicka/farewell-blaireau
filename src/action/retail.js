import {Get, Post, Upload} from 'kulakan/network'
import {GetAttrs} from 'kulakan/util'

function List() {
    return (dispatch, getState) => {
        const state = getState()
        const {limit, currentPage, name} = GetAttrs(state.retail, ['limit', 'currentPage', 'name'])

        dispatch(['/retail/update', {payload: {isFetching: true}}])
        return Get(dispatch, '/admin/retail', {name, limit, offset: (currentPage - 1) * limit})
        .then((result) => {
            dispatch(['/retail/update', {payload: {
                isFetching: false,
                total: result.count,
                list: result.buyers,
            }}])
        })
        .catch(() => {
            dispatch(['/retail/update', {payload: {isFetching: false}}])
        })
    }
}

let editFilterTimeout
function EditFilter(name) {
    return (dispatch, getState) => {
        clearTimeout(editFilterTimeout)
        dispatch(['/retail/update', {payload: {name}}])
        editFilterTimeout = setTimeout(() => {
            dispatch(['/retail/update', {payload: {currentPage: 1}}])
            dispatch(List())
        }, 1000)
    }
}

function Profile(id) {
    return (dispatch, getState) => {
        dispatch(['/retail/update', {payload: {isFetching: true, profileFound: false}}])
        return Get(dispatch, `/admin/retail/${id}`)
        .then((response) => {
            dispatch(['/retail/update', {payload: {isFetching: false}}])
            if (response.length === 0) return

            dispatch(['/retail/update', {payload: {
                profile: response[0],
                profileFound: true,
            }}])
        })
        .catch(() => {
            dispatch(['/retail/update', {payload: {isFetching: false}}])
        })
    }
}

function UploadImage(id) {
    return (dispatch, getState) => {
        const form = document.getElementById('profileForm')
        const formData = new FormData(form)

        return Upload(`/admin/retail/${id}/upload-image`, formData)
        .then((response) => {
            dispatch(['/retail/update', {payload: {profile: {profilePicture: response.image}}}])
        })
        .catch(() => {
        })
    }
}

function ChangePassword(id) {
    return (dispatch, getState) => {
        const password = getState().retail.get('password')
        if (password === '') {
            alert('Password tidak boleh kosong.')
            return
        }

        dispatch(['/retail/update', {payload: {isChangingPassword: true}}])
        return Post(dispatch, `/admin/retail/${id}/change-password`, {password})
        .then((response) => {
            dispatch(['/retail/update', {payload: {isChangingPassword: false, isEditPassword: false}}])
            alert('Sukses mengubah password.')
        })
        .catch(() => {
            dispatch(['/retail/update', {payload: {isChangingPassword: false}}])
            alert('Gagal mengubah password.')
        })
    }
}

function PickState(name) {
    return (dispatch, getState) => {
        const state = getState()
        const provinces = state.misc.get('states')

        const selectedProvince = provinces.find((province) => (province.get('Name') === name))
        if (selectedProvince) {
            dispatch(['/retail/update', {payload: {info: {
                provinceName: selectedProvince.get('Name'),
                stateID: selectedProvince.get('StateID'),
                cityName: '',
                cityID: -1,
            }}}])
            dispatch(['misc/cities', selectedProvince.get('StateID')])
        } else {
            dispatch(['/retail/update', {payload: {info: {
                provinceName: name,
                stateID: -1,
                cityName: '',
                cityID: -1,
            }}}])
        }
    }
}

function PickCity(name) {
    return (dispatch, getState) => {
        const state = getState()
        const stateID = state.retail.getIn(['info', 'stateID'])
        const cities = state.misc.getIn(['cities', stateID.toString()])

        const selectedCity = cities.find((city) => (city.get('Name') === name))
        if (selectedCity) {
            dispatch(['/retail/update', {payload: {info: {
                cityName: selectedCity.get('Name'),
                cityID: selectedCity.get('CityID'),
            }}}])
        } else {
            dispatch(['/retail/update', {payload: {info: {
                cityName: name,
                cityID: -1,
            }}}])
        }
    }
}

function Save(id) {
    return (dispatch, getState) => {
        const state = getState()
        const info = state.retail.get('info')

        const {name, shop, address, stateID, cityID, zipcode} = GetAttrs(info, ['name', 'shop', 'address','stateID','cityID','zipcode'])
        dispatch(['/retail/update', {payload: {isSaving: true}}])
        return Post(dispatch, `/admin/retail/${id}`, {name, shop, address, stateID, cityID, zipcode})
        .then((response) => {
            dispatch(['/retail/update', {payload: {isSaving: false}}])
            dispatch(['/retail/update', {payload: {profile: response.updated, isEditInfo: false}}])
        })
        .catch(() => {
            dispatch(['/retail/update', {payload: {isSaving: false}}])
        })
    }
}

export default {
    changePassword: ChangePassword,
    editFilter: EditFilter,
    pickCity: PickCity,
    pickState: PickState,
    profile: Profile,
    save: Save,
    uploadImage: UploadImage,
    list: List,
}
