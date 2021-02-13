import {Request, Response} from "express";
import {instance} from '../middleware/request'
import {errorHandler} from "../middleware/error";
import {ParseIssue} from "../logicIssue/parseIssue";

export const getIssues = async (req: Request, res: Response) => {
    try {
        const data = await instance.post('/rest/api/3/search', req.body).then(response => response.data)
        const parseIssues = new ParseIssue(data)
        const newData = parseIssues.parse()
        res.status(200).json(newData)
    } catch (e) {
        errorHandler(res, e)
    }
}
