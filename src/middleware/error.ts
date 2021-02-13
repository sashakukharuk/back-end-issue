import {Response} from "express";
import {Logger} from "../logger/logger";

export const errorHandler = (res: Response, error: Error) => {
    Logger.get().info(error.stack)
    Logger.get().info(error.message)
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    })
}
