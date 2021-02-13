import {Request, Response} from "express";
import {errorHandler} from "../middleware/error";
import {Logger} from "../logger/logger";
import moment from "moment";
import dotenv from 'dotenv'
import {MysqlError} from 'mysql'
const mysql = require('mysql')
dotenv.config()

const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_db-2'
})

db.connect((err: MysqlError) => {
    if(err) Logger.get().info(err)
    Logger.get().info('Database connected')
})

export const getUserInfo = async (req: Request, res: Response) => {
    const sub = req.params.sub
    await db.query("SELECT * FROM `users`", async (err: MysqlError | null, result: any) => {
        try {
            console.log(result)
            if (result[0]) {
                res.status(200).json(result[0])
            } else {
                await db.query("INSERT INTO `users` SET ?", {users: sub}, async (err: MysqlError | null, result: any) => {
                    if(err) Logger.get().info(err)
                    await db.query("SELECT * FROM `users` WHERE users =?", [sub],  (err: MysqlError | null, result: any) => {
                        if(err) Logger.get().info(err)
                        res.status(200).json(result[0])
                    })
                })
            }
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepLink = async (req: Request, res: Response) => {
    const {link, userInfo} = req.body
    await db.query("INSERT INTO `links` SET ?", {link, user_id: userInfo.id, times: moment(Date.now()).format('HH:mm:ss'), dates: moment(Date.now()).format('YYYY-MM-DD')}, (err: MysqlError | null, result: any) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepChangeFilter = async (req: Request, res: Response) => {
    const {jql, userInfo} = req.body
    await db.query("INSERT INTO `filter` SET ?", {jql, user_id: userInfo.id, times: moment(Date.now()).format('HH:mm:ss'), dates: moment(Date.now()).format('YYYY-MM-DD')}, (err: MysqlError | null, result: any) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepGenerationTable = async (req: Request, res: Response) => {
    const {userInfo} = req.body
    await db.query("INSERT INTO `generate` SET ?", {user_id: userInfo.id, times: moment(Date.now()).format('HH:mm:ss'), dates: moment(Date.now()).format('YYYY-MM-DD')}, (err: MysqlError | null, result: any) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepError = async (req: Request, res: Response) => {
    const {error, userInfo} = req.body
    await db.query("INSERT INTO `errors` SET ?", {errors: error, user_id: userInfo.id, times: moment(Date.now()).format('HH:mm:ss'), dates: moment(Date.now()).format('YYYY-MM-DD')}, (err: MysqlError | null, result: any) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}
