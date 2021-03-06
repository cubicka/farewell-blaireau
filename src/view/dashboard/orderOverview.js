import React, {Component} from 'react'
import { PieChart, Pie, Cell } from 'recharts'
import style from './orderOverview.css'

const COLORS = ['#00bae2', '#efb150', '#8b89d5', '#ff646f']

function SimplePieChart({data}) {
    return (
        <PieChart width={500} height={460} onMouseEnter={() => {}}>
            <Pie
                data={data} 
                cx={250} 
                cy={220} 
                innerRadius={100}
                outerRadius={200}
                fill="#8884d8"
                label
            >
                {
                    data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
                }
            </Pie>
        </PieChart>
    );
}

function Legends({idx, name}) {
    return (
        <span className={style.legendItem}>
            <span className={style.legendIcon} style={{backgroundColor: COLORS[idx]}} />
            <span className={style.legendLabel}>{name}</span>
        </span>
    )
}

class OrderOverview extends Component {
    shouldComponentUpdate(nextProps) {
        const attrs = ['created', 'accepted', 'delivered', 'cancelled']
        return attrs.reduce((result, attr) => {
            return result || nextProps[attr] !== this.props[attr]
        }, false)
    }
    render() {
        const {created, accepted, delivered, cancelled} = this.props
        const data = [{name: 'Diterima', value: created}, {name: 'Diproses', value: accepted},
                      {name: 'Dikirm', value: delivered}, {name: 'Ditolak', value: cancelled}]

        return (
            <div className={style.wrapper}>
                <div className={style.title}>Persentase Order</div>
                <div className={style.charts}>
                    <SimplePieChart data={data} />
                </div>
                <div className={style.legendWrapper}>
                    <div className={style.legendRow}>
                        <Legends idx={0} name={'Order Diterima'} />
                        <Legends idx={1} name={'Order Diproses'} />
                    </div>
                    <div className={style.legendRow}>
                        <Legends idx={2} name={'Order Dikirim'} />
                        <Legends idx={3} name={'Order Ditolak'} />
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderOverview
