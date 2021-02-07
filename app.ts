const express = require('express')
const bodyParser = require('body-parser')
const {v4: uuidv4} = require('uuid')
require('dotenv').config()
import issuesRouter from "./routes/issues";
import filterRouter from "./routes/filter";
import stepsRouter from "./routes/steps";
import {Logger} from "./logger/logger";
import {asyncLocalStorage} from "./async-storage";

const app = express()

app.use((req, res, next) => {
    const traceId = req.headers['x-request-id'] || uuidv4()
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
