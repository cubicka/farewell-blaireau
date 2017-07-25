import {fromJS} from 'immutable'

const initialState = {
    items: {},
    list: [],
    images: [],
    form: [],
    view: {
        list: {
            filterKey: "",
            page: 1,
            limit: 10,
            pageNum: 0,
        },
        images: {
            filterKey: "",
            page: 1,
            limit: 5,
            pageNum: 0,
        },
        form: {
            sku: '',
            isLoading: false,
            isSaving: false,
        }
    }
}

const events = {
    "items/update": UpdateItems,

    "list/update": UpdateList,
    "view/list/update": (state, action) => (state.mergeDeep({view: {list: action}})),

    "images/update": UpdateImages,
    "view/images/update": (state, action) => (state.mergeDeep({view: {images: action}})),

    "form/update": UpdateForm,
    "view/form/update": (state, action) => (state.mergeDeep({view: {form: action}})),

    "form/reset": (state, action) => (state.update('form', (form) => (fromJS([])))),
    "formItem/edit": EditFormItem,
    "formItem/remove": RemoveForm,
}

function UpdateItems(state, {items}) {
    return state.update('items', (prevItems) => {
        return items.reduce((accum, item) => {
            return accum.mergeDeep({[item.id]: item})
        }, prevItems)
    })
}

function UpdateList(state, {items}) {
    return UpdateItems(state, {items}).merge({
        list: items.map((item) => (item.id))
    })
}

function UpdateImages(state, {items}) {
    return UpdateItems(state, {items}).merge({
        images: items.map((item) => (item.id))
    })
}

function UpdateForm(state, {items}) {
    return state.update('form', (form) => {
        return items.reduce((accum, item) => {
            const haveFound = accum.find((item2) => (item2.get('sku') === item.sku))
            if (haveFound) return accum
            return accum.push(fromJS(item))
        }, form)
    })
}

function RemoveForm(state, {idx}) {
    return state.update('form', (form) => {
        return form.delete(idx)
    })
}

function EditFormItem(state, {idx, attr, val}) {
    return state.update('form', (form) => {
        console.log('idx', idx, attr, val)
        return form.update(idx, (item) => (item.merge({[attr]: val})))
    })
}

export default {
    initialState, events,
}
