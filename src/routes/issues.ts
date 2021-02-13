import express, {Router} from "express";
import {getIssues} from '../controlles/issues'
const router: Router = express.Router()

router.post('/', getIssues)

export default router
