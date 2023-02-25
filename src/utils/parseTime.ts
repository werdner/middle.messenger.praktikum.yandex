export function parseTime(time?: Date) {
    if (!time) return '';

    time = new Date(time);
    return time.getHours() + ':' + time.getMinutes();
}
