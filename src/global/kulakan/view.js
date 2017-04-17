export function ToTitleCase(s) {
    return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export function ToPrice(x) {
    if (!x) {
        return 'Rp 0';
    }

    return `Rp ${x.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")}`;
}
