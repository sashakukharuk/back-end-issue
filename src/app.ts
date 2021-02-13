import express, {Application, Request, Response, NextFunction} from "express";
import bodyParser from "body-parser";
import issuesRouter from "./routes/issues";
import filterRouter from "./routes/filter";
import stepsRouter from "./routes/steps";
import {Logger} from "./logger/logger";
import {asyncLocalStorage} from "./async-storage";
import dotenv from 'dotenv'

dotenv.config()

const app: Application = express()

app.use((req: Request, res: Response, next: NextFunction) => {
    const traceId: string | string[] = req.headers['x-request-id'] || String(Date.now())
    asyncLocalStorage.run(new Map(), () => {
        Logger.init(traceId)
        next()
    })
})

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/issues', issuesRouter)
app.use('/api/filter', filterRouter)
app.use('/api/step', stepsRouter)

export default app
