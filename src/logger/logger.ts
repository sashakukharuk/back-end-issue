import {asyncLocalStorage} from "../async-storage";
import pino from "pino";
const logger = pino({
    prettyPrint: true
})




export class Logger {
    static init(traceId: string | string[]) {
        const store = asyncLocalStorage.getStore()
        const childLogger = logger.child({
            traceId
        })
        // @ts-ignore
        store.set('logger', childLogger)
    }

    static get() {
        const store = asyncLocalStorage.getStore()
        // @ts-ignore
        const childLogger = store?.get('logger')
        return childLogger ? childLogger : logger
    }
}
