import React from 'react'
import Page from '../components/pageWithHeader'
import OverviewCard from './overviewCard'
import OrderOverview from './orderOverview'
import OrderTable from './orderTable'
import ItemTable from './itemTable'
import style from './style.css'

function Dashboard() {
    return (
        <Page header={'dashboard'} className={style.wrapper}>
            <div className={style.wrapper}>
                <div className={style.row}>
                    <span className={style.title}>Dashboard</span>
                    <div className={style.menu} />
                </div>
                <div className={style.row}>
                    <OverviewCard idx={0} val={678} label={'Jumlah Order'} />
                    <OverviewCard idx={1} val={99999999} label={'Keuntungan'} />
                    <OverviewCard idx={2} val={678} label={'Order Sukses'} />
                    <OverviewCard idx={3} val={10} label={'Order Ditolak'} />
                </div>
                <div className={style.row} style={{marginTop: '28px'}}>
                    <OrderOverview />
                    <div style={{flex: '1 0 auto'}}>
                        <OrderTable />
                        <ItemTable />
                    </div>
                </div>
            </div>
        </Page>
    )
}

export default Dashboard
