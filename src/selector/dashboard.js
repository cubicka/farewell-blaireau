import {createSelector} from 'reselect'

const details  = createSelector(
    (state) => (state.dashboard),
    (dashboard) => {
        const orders = dashboard.get('latest')
        const totalPrices = orders.reduce((total, order) => {
            return total + order.get('totalPrice')
        }, 0)

        return {
            orders, totalPrices,
            created: parseInt(dashboard.getIn(['created', '0', 'count']), 10),
            accepted: parseInt(dashboard.getIn(['accepted', '0', 'count']), 10),
            delivered: parseInt(dashboard.getIn(['delivered', '0', 'count']), 10),
            cancelled: parseInt(dashboard.getIn(['cancelled', '0', 'count']), 10),
            items: dashboard.get('popularItems'),
        }
    }
)

export default {
    details,
}
