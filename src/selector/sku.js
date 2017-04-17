import {createSelector} from 'reselect'

const list = createSelector(
    (state) => (state.sku.get('items')),
    (state) => (state.sku.get('list')),
    (items, list) => {
        return list.filter((id) => (items.has(id.toString()))).map((id) => (items.get(id.toString())))
    }
)

const images = createSelector(
    (state) => (state.sku.get('items')),
    (state) => (state.sku.get('images')),
    (items, list) => {
        return list.filter((id) => (items.has(id.toString()))).map((id) => (items.get(id.toString())))
    }
)

export default {
    list, images,
}