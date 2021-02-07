import {Logger} from "../logger/logger";

export const errorHandler = (res, error) => {
    Logger.get().info(error.stack)
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
