export function replaceNullToString(data: Record<string, any>) {
    for (const key in data) {
        if (!data[key]) {
            data[key] = ''
        }
    }

    return data
}
