import {Get, Post, Upload} from 'kulakan/network'

function List() {
    return (dispatch, getState) => {
        const state = getState()
        const listView = state.sku.getIn(['view', 'list'])
        const filter = listView.get('filterKey')
        const page = listView.get('page')
        const limit = listView.get('limit')

        return Get(dispatch, '/admin/katalog', {filter, limit, offset: (page-1)*limit})
        .then((result) => {
            dispatch(['/sku/list/update', result])
            dispatch(['/sku/view/list/update', {pageNum: Math.ceil(result.count / limit)}])
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

function Debounce(fn) {
    let id

    return (dispatch) => {
        console.log('here Debounce')
        clearTimeout(id)
        id = setTimeout(() => {
            console.log('dispatching')
            dispatch(fn)
        }, 1300)
    }
}

function EditListFilter(newFilterKey) {
    return (dispatch) => {
        dispatch(["/sku/view/list/update", {filterKey: newFilterKey}])
        dispatch(Debounce([["/sku/view/list/update", {page: 1}], ['sku/list']]))
    }
}

function NextListPage() {
    return (dispatch, getState) => {
        const state = getState()
        const listView = state.sku.getIn(['view', 'list'])
        const total = listView.get('pageNum')
        const page = listView.get('page')

        if (page < total) {
            dispatch(['/sku/view/list/update', {page: page + 1}])
            dispatch(List())
        }
    }
}

function PrevListPage() {
    return (dispatch, getState) => {
        const state = getState()
        const listView = state.sku.getIn(['view', 'list'])
        const page = listView.get('page')

        if (page > 1) {
            dispatch(['/sku/view/list/update', {page: page - 1}])
            dispatch(List())
        }
    }
}

function Images() {
    return (dispatch, getState) => {
        const state = getState()
        const view = state.sku.getIn(['view', 'images'])
        const filter = view.get('filterKey')
        const page = view.get('page')
        const limit = view.get('limit')

        return Get(dispatch, '/admin/katalog', {filter, limit, offset: (page-1)*limit})
        .then((result) => {
            dispatch(['/sku/images/update', result])
            dispatch(['/sku/view/images/update', {pageNum: Math.ceil(result.count / limit)}])
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

function NoImages() {
    return (dispatch, getState) => {
        return Get(dispatch, '/admin/katalog/no-image')
        .then((result) => {
            dispatch(['/sku/images/update', result])
            dispatch(['/sku/view/images/update', {pageNum: 1}])
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

function EditImageFilter(newFilterKey) {
    return (dispatch) => {
        dispatch(["/sku/view/images/update", {filterKey: newFilterKey}])
        dispatch(Debounce([["/sku/view/images/update", {page: 1}], ['sku/images']]))
    }
}

function NextImagePage() {
    return (dispatch, getState) => {
        const state = getState()
        const listView = state.sku.getIn(['view', 'images'])
        const total = listView.get('pageNum')
        const page = listView.get('page')

        if (page < total) {
            dispatch(['/sku/view/images/update', {page: page + 1}])
            dispatch(Images())
        }
    }
}

function PrevImagePage() {
    return (dispatch, getState) => {
        const state = getState()
        const listView = state.sku.getIn(['view', 'images'])
        const page = listView.get('page')

        if (page > 1) {
            dispatch(['/sku/view/images/update', {page: page - 1}])
            dispatch(Images())
        }
    }
}

function UploadImage(id, name) {
    return (dispatch, getState) => {
        const form = document.getElementById(name);
        const formData = new FormData(form);

        // dispatch(['/sku/view/images/update', {isLoading: true}])
        return Upload('/admin/katalog/' + id.toString() + '/updateImage', formData)
        .then((result) => {
            // dispatch(['/sku/view/images/update', {isLoading: false}])
            dispatch(['/sku/items/update', {items: [{id, image: result.image}]}])
        })
        .catch(() => {
            // dispatch(['/sku/view/images/update', {isLoading: false}])
        })
    }
}

function EditFormSKU(sku) {
    return (dispatch) => {
        dispatch(['/sku/view/form/update', {sku}])
    }
}

function FindSKU() {
    return (dispatch, getState) => {
        const state = getState()
        const view = state.sku.getIn(['view', 'form'])
        const sku = view.get('sku')

        if (sku === "") return

        dispatch(['/sku/view/form/update', {isLoading: true}])
        return Get(dispatch, '/admin/katalog/bySKU', {sku})
        .then((result) => {
            if (result.items.length === 0) {
                dispatch(['/sku/form/update', {items: [{sku, name: '', category: '', price: ''}]}])
            } else {
                dispatch(['/sku/form/update', result])
            }
            dispatch(['/sku/view/form/update', {sku: ''}])
            dispatch(['/sku/view/form/update', {isLoading: false}])
        })
        .catch(() => {
            dispatch(['/sku/view/form/update', {isLoading: false}])
        })
    }
}

function SaveSKU() {
    return (dispatch, getState) => {
        const state = getState()
        const items = state.sku.get('form')

        dispatch(['/sku/view/form/update', {isSaving: true}])
        return Post(dispatch, '/admin/katalog/bulkUpdate', {items})
        .then((result) => {
            dispatch(['/sku/view/form/update', {isSaving: false}])
            dispatch(['/sku/form/reset'])
            dispatch(List())
            dispatch(Images())
            alert('Sukses mengubah data item.')
        })
        .catch((err) => {
            dispatch(['/sku/view/form/update', {isSaving: false}])
            alert('Gagal mengubah data item.')
        })
    }
}

function GetAllCategories() {
    return (dispatch) => {
        return Get(dispatch, '/admin/katalog/category')
        .then((result) => {
            dispatch(['/sku/categories/update', result.categories])
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

function FetchImageByCategory(category) {
    return (dispatch) => {
        return Get(dispatch, '/admin/katalog/list-by-category', {category})
        .then((result) => {
            // console.log('res', result)
            dispatch(['/sku/images/update', result])
            dispatch(['/sku/view/images/update', {pageNum: 1}])
        })
        .catch((err) => {
            console.log('err', err)
        })
    }
}

function PartialUpdate(id, attr) {
    return (dispatch, getState) => {
        const editedValue = getState().sku.getIn(['edited', id.toString(), attr])

        if (!editedValue) return

        dispatch(['/sku/triage/startSave', {id, attr}])
        return Post(dispatch, '/admin/katalog/bulkUpdate', {items: [{id, [attr]: editedValue}]})
        .then((result) => {
            dispatch(['/sku/items/update', {items: [{id, [attr]: editedValue}]}])
            dispatch(['/sku/triage/stopSave', {id, attr}])
            dispatch(['/sku/triage/stopEdit', {id, attr}])
        })
        .catch((err) => {
            console.log('err', err)
            dispatch(['/sku/triage/stopEdit', {id, attr}])
        })
    }
}

export default {
    editListFilter: EditListFilter,
    list: List,
    nextListPage: NextListPage,
    prevListPage: PrevListPage,

    images: Images,
    noImageList: NoImages,
    editImageFilter: EditImageFilter,
    nextImagePage: NextImagePage,
    prevImagePage: PrevImagePage,

    uploadImage: UploadImage,

    editFormSKU: EditFormSKU,
    findSKU: FindSKU,
    saveSKU: SaveSKU,

    categories: GetAllCategories,
    imageByCategory: FetchImageByCategory,
    partialUpdate: PartialUpdate,
}
