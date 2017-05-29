export function FnsCreator(dicts, defaultReturn) {
    return (events, ...args) => {
        if (events in dicts) {
            return dicts[events](...args)
        }

        return defaultReturn;
    }
}

export function GetAttrs(immutableObj, attrs) {
    if (!immutableObj || typeof immutableObj.get !== 'function') {
        return {}
    }

    return attrs.reduce((accum, attr) => {
        accum[attr] = immutableObj.get(attr)
        return accum
    }, {})
}

export function GetOrderStatus(order) {
    const {accepted, delivered, cancelled} = GetAttrs(order, ['created', 'accepted', 'delivered', 'cancelled'])

    if (cancelled) return 'Ditolak'
    if (delivered) return 'Dikirim'
    if (accepted) return 'Diproses'
    return 'Diterima'
}

export function ToSimpleTime(date) {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}

export function GetElapsedTime(prevDate) {
    const prev = new Date(prevDate)
    const now = new Date()
    let diff = Math.round((now - prev) / 1000)

    if (diff < 60) return `${diff} detik yang lalu`

    diff = Math.round(diff/60)
    if (diff < 60) return `${diff} menit yang lalu`

    diff = Math.round(diff/60)
    if (diff < 24) return `${diff} jam yang lalu`

    diff = Math.round(diff/24)
    if (diff < 30) return `${diff} hari yang lalu`

    return ToSimpleTime(prevDate)
}

export function ToPrice(x) {
    if (!x) {
        return 'Rp 0';
    }

    return `Rp ${x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
}

export function ToTitleCase(s) {
    return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function ToStartOfDay(date) {
    let d = new Date(date)
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)

    return d
}

export function ToEndOfDay(date) {
    let d = new Date(date)
    d.setDate(d.getDate() + 1)

    return ToStartOfDay(d)
}
