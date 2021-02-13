import {getUserInfo, stepChangeFilter, stepError, stepGenerationTable, stepLink} from "../controlles/steps";
import express, {Router} from "express";
const router: Router = express.Router()

router.get('/userinfo/:sub', getUserInfo)
router.post('/link', stepLink)
router.post('/change/filter', stepChangeFilter)
router.post('/generation/table', stepGenerationTable)
router.post('/error', stepError)

export default router
