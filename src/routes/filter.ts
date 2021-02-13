import express, {Router} from "express";
import {getFilter} from "../controlles/filter"
const router: Router = express.Router()

router.get('/', getFilter)

export default router
