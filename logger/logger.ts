import {asyncLocalStorage} from "../async-storage";

const logger = require('pino')({
    prettyPrint: true
})




export class Logger {
    static init(traceId: string) {
        const store = asyncLocalStorage.getStore()
        const childLogger = logger.child({
            traceId
        })
        store.set('logger', childLogger)
    }

    static get() {
        const store = asyncLocalStorage.getStore()
        const childLogger = store?.get('logger')
        return childLogger ? childLogger : logger
    }
}
