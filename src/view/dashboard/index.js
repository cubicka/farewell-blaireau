import React from 'react'
import Icon from 'react-fontawesome'
import {ToPrice} from 'kulakan/util'
import Calendar from '../components/calendar'
import {WithLoading} from '../components/button'
import WithActions from '../components/withActions'
import Page from '../components/pageWithHeader'
import OverviewCard from './overviewCard'
import OrderOverview from './orderOverview'
import OrderTable from './orderTable'
import ItemTable from './itemTable'
import Om from '../om'
import style from './style.css'

function Dashboard({details, isDownloading, isFetching, startDate, endDate, ChangeDate, Download, Refresh}) {
    const {created, accepted, cancelled, delivered, totalPrices, orders, items} = details
    const nOrders = created + accepted + cancelled + delivered

    return (
        <WithActions actions={[["dashboard/fetch"]]}>
            <Page header={'dashboard'} className={style.wrapper}>
                {
                    isFetching &&
                    <span className={style.loading}>
                        <Icon name={'spinner'} className={'fa-spin'} style={{margin: 10}} />
                        Sedang mengambil data
                    </span>
                }
                <div className={style.wrapper}>
                    <div className={style.row}>
                        <span className={style.title}>Dashboard</span>
                        <div className={style.menu}>
                            <span className={style.dateLabel}>Dari Tanggal</span>
                            <Calendar className={style.date} selected={startDate} onChange={ChangeDate('startDate')} />
                            <span className={style.dateLabel}>Sampai Tanggal</span>
                            <Calendar className={style.date} selected={endDate} onChange={ChangeDate('endDate')} />
                            <div className={style.calculateBtn} onClick={Refresh}>Kalkulasi!</div>
                            <WithLoading isLoading={isDownloading} className={style.printBtn} text={'Unduh Laporan'} onClick={Download} />
                        </div>
                    </div>
                    <div className={style.row}>
                        <OverviewCard idx={0} val={nOrders} label={'Jumlah Order'} />
                        <OverviewCard idx={1} val={ToPrice(totalPrices)} label={'Omset'} />
                        <OverviewCard idx={2} val={delivered} label={'Order Sukses'} />
                        <OverviewCard idx={3} val={cancelled} label={'Order Ditolak'} />
                    </div>
                    <div className={style.row} style={{marginTop: '28px'}}>
                        <OrderOverview created={created} accepted={accepted} cancelled={cancelled} delivered={delivered} />
                        <div style={{flex: '1 0 auto'}}>
                            <OrderTable orders={orders} />
                            <ItemTable items={items} />
                        </div>
                    </div>
                </div>
            </Page>
        </WithActions>
    )
}

const states = {
    details: "dashboard/details",
    isDownloading: "/dashboard/isDownloading",
    isFetching: "/dashboard/isFetching",
    startDate: "/dashboard/startDate",
    endDate: "/dashboard/endDate",
}

const actions = {
    // EditItem: (idx, attr) => (e) => ["/sku/formItem/edit", {idx, attr, val: e.target.value}],
    Download: () => ["dashboard/excel"],
    Refresh: () => [["dashboard/fetch"]],
    ChangeDate: (attr) => (date) => [["/dashboard/update", {payload: {[attr]: date}}]],
}

export default Om(states, actions)(Dashboard)
