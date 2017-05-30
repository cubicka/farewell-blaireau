import {Get, Post, Upload} from 'kulakan/network'
import {GetAttrs} from 'kulakan/util'
    
function WS() {
    return (dispatch, getState) => {
        const state = getState()
        const {limit, currentPage, name} = GetAttrs(state.ws, ['limit', 'currentPage', 'name'])

        dispatch(['/ws/update', {payload: {isFetching: true}}])
        return Get(dispatch, '/admin/ws', {name, limit, offset: (currentPage - 1) * limit})
        .then((response) => {
            dispatch(['/ws/update', {
                payload: {
                    list: response.sellers,
                    total: response.count,
                }
            }])
            dispatch(['/ws/update', {payload: {isFetching: false}}])
        })
        .catch((err) => {
            dispatch(['/ws/update', {payload: {isFetching: false}}])
        })
    }
}

let editFilterTimeout
function EditFilter(name) {
    return (dispatch, getState) => {
        clearTimeout(editFilterTimeout)
        dispatch(['/ws/update', {payload: {name}}])
        editFilterTimeout = setTimeout(() => {
            dispatch(['/ws/update', {payload: {currentPage: 1}}])
            dispatch(WS())
        }, 1000)
    }
}

function Profile(id) {
    return (dispatch, getState) => {
        dispatch(['/ws/update', {payload: {isFetching: true, profileFound: false}}])
        return Get(dispatch, `/admin/ws/${id}`)
        .then((response) => {
            dispatch(['/ws/update', {payload: {isFetching: false}}])
            if (response.length === 0) return

            dispatch(['/ws/update', {payload: {
                profile: response[0],
                profileFound: true,
            }}])
        })
        .catch(() => {
            dispatch(['/ws/update', {payload: {isFetching: false}}])
        })
    }
}

function UploadImage(id) {
    return (dispatch, getState) => {
        const form = document.getElementById('profileForm');
        const formData = new FormData(form);

        return Upload(`/admin/ws/${id}/upload-image`, formData)
        .then((response) => {
            dispatch(['/ws/update', {payload: {profile: {image: response.image}}}])
        })
        .catch(() => {
        })
    }
}

function ChangePassword(id) {
    return (dispatch, getState) => {
        const password = getState().ws.get('password')

        if (password === '') {
            alert('Password tidak boleh kosong.')
            return
        }

        dispatch(['/ws/update', {payload: {isChangingPassword: true}}])
        return Post(dispatch, `/admin/ws/${id}/change-password`, {password})
        .then((response) => {
            dispatch(['/ws/update', {payload: {isChangingPassword: false, isEditPassword: false}}])
            alert('Sukses mengubah password.')
        })
        .catch(() => {
            dispatch(['/ws/update', {payload: {isChangingPassword: false}}])
            alert('Gagal mengubah password.')
        })
    }
}

function PickBank(name) {
    return (dispatch, getState) => {
        const state = getState()
        const banks = state.misc.get('banks')

        const selectedBank = banks.find((bank) => (bank.get('name') === name))
        if (selectedBank) {
            dispatch(['/ws/update', {payload: {info: {
                bankName: selectedBank.get('name'),
                bankID: selectedBank.get('code'),
            }}}])
        } else {
            dispatch(['/ws/update', {payload: {info: {
                bankName: name,
                bankID: -1,
            }}}])
        }
    }
}

function PickState(name) {
    return (dispatch, getState) => {
        const state = getState()
        const provinces = state.misc.get('states')

        const selectedProvince = provinces.find((province) => (province.get('Name') === name))
        if (selectedProvince) {
            dispatch(['/ws/update', {payload: {info: {
                provinceName: selectedProvince.get('Name'),
                stateID: selectedProvince.get('StateID'),
                cityName: '',
                cityID: -1,
            }}}])
            dispatch(['misc/cities', selectedProvince.get('StateID')])
        } else {
            dispatch(['/ws/update', {payload: {info: {
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
        const stateID = state.ws.getIn(['info', 'stateID'])
        const cities = state.misc.getIn(['cities', stateID.toString()])

        const selectedCity = cities.find((city) => (city.get('Name') === name))
        if (selectedCity) {
            dispatch(['/ws/update', {payload: {info: {
                cityName: selectedCity.get('Name'),
                cityID: selectedCity.get('CityID'),
            }}}])
        } else {
            dispatch(['/ws/update', {payload: {info: {
                cityName: name,
                cityID: -1,
            }}}])
        }
    }
}

function Save(id) {
    return (dispatch, getState) => {
        const state = getState()
        const info = state.ws.get('info')

        const {name, ktp, shop, phone, address, stateID, cityID, birth, bankAccountNumber, bankAccountName, bankID, bankBranch} = GetAttrs(info, ['name', 'ktp', 'shop','phone','address','stateID','cityID','birth','bankAccountNumber','bankAccountName','bankID','bankBranch'])
        dispatch(['/ws/update', {payload: {isSaving: true}}])
        return Post(dispatch, `/admin/ws/${id}`, {name, ktp, shop, phone, address, stateID, cityID, birth, bankAccountNumber, bankAccountName, bankID, bankBranch})
        .then((response) => {
            dispatch(['/ws/update', {payload: {isSaving: false}}])
            dispatch(['/ws/update', {payload: {profile: response.updated, isEditInfo: false}}])
        })
        .catch(() => {
            dispatch(['/ws/update', {payload: {isSaving: false}}])
        })
    }
}

export default {
    changePassword: ChangePassword,
    editFilter: EditFilter,
    pickBank: PickBank,
    pickCity: PickCity,
    pickState: PickState,
    profile: Profile,
    save: Save,
    ws: WS,
    uploadImage: UploadImage,
}
