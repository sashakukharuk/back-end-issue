export class FilterGradationData {
    static filter<T>(arr: T[]) {
        const o = Object.create(null)
        const newArr = []
        for (let key of arr) {
            // @ts-ignore
            if (!o[key.name]) {
                // @ts-ignore
                o[key.name] = true
                newArr.push(key)
            }
        }
        return newArr
    }

    static gradation<T, V>(arrFilter: T[], arr: V[]) {
        return arrFilter.map(filter => {
            for (let i = 0; i < arr.length; i++) {
                // @ts-ignore
                if (arr[i].name === filter) {
                    return arr[i]
                }
            }
        }).filter(item => item !== undefined)
    }
}
