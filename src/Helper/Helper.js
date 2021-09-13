global.isset = (obj) => {
    if (typeof (obj) == 'undefined' || obj == null) {
        return false;
    }
    return true;
}
global.formatNumber = (num) => {
    if (!num) return 0;
    num = clearNumber(num);
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
function clearNumber(string) {
    if (!string) return 0;
    return string.toString().replace(/[^\d\-\.]/g, '');
}