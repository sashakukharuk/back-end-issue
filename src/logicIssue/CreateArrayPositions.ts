export class CreateArrayPositions {
    // @ts-ignore
    createLevelsArray(pointY: any[], pointX: any[]) {
        const arr = []
        for (let y = 0; y < pointY.length; y++) {
            arr.push([])
            for (let x = 0; x < pointX.length; x++) {
                // @ts-ignore
                arr[y].push([])
            }
        }
        return arr
    }

    static createPositionsPoint(arr: any[]) {
        return arr.reduce((obj, value, idx) => {
            obj[value.name] = idx
            return obj
        }, {})
    }
}
