import {getUserInfo, stepChangeFilter, stepError, stepGenerationTable, stepLink} from "../controlles/steps";
const express = require('express')
const router = express.Router()

router.get('/userinfo/:sub', getUserInfo)
router.post('/link', stepLink)
router.post('/change/filter', stepChangeFilter)
router.post('/generation/table', stepGenerationTable)
router.post('/error', stepError)

export default router
