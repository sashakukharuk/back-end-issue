const express = require('express')
import {getFilter} from "../controlles/filter"
const router = express.Router()

router.get('/', getFilter)

export default router
