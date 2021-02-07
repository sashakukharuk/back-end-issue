import {instance} from '../middleware/request'
import {errorHandler} from "../middleware/error";
import {FilterType} from "../Types/FilterType";

export const getFilter = async (req, res) => {
    try {
        const filter = await instance.get<FilterType[]>('rest/api/3/filter').then(response => response.data)
        res.status(200).json(filter)
    } catch (e) {
        errorHandler(res, e)
    }
}
