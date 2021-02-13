import {Request, Response} from "express";
import {errorHandler} from "../middleware/error";
import {FilterType} from "../Types/FilterType";
import {instance} from "../middleware/request";

export const getFilter = async (req: Request, res: Response) => {
    try {
        const filter = await instance.get<FilterType[]>('rest/api/3/filter').then(response => response.data)
        res.status(200).json(filter)
    } catch (e) {
        errorHandler(res, e)
    }
}
