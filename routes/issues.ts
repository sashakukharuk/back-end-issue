const express = require('express')
import {getIssues} from '../controlles/issues'
const router = express.Router()

router.post('/', getIssues)

export default router
