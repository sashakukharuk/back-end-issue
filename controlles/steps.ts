import {errorHandler} from "../middleware/error";
import {Logger} from "../logger/logger";
const moment = require('moment')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect((err, result) => {
    if(err) Logger.get().info(result)
    Logger.get().info('Database connected')
})
// db.connect(err => err ? console.log(err) : console.log('Database connected'))

export const getUserInfo = async (req, res) => {
    let sub = req.params.sub
    await db.query("SELECT * FROM `users` WHERE user_sub =?", [sub], async (err, result) => {
        try {
            if (result[0]) {
                res.status(200).json(result[0])
            } else {
                await db.query("INSERT INTO `users` SET ?", {user_sub: sub}, async (err) => {
                    if (err) errorHandler(res, err)
                    await db.query("SELECT * FROM `users` WHERE user_sub =?", [sub],  (err, result) => {
                        if (err) errorHandler(res, err)
                        res.status(200).json(result[0])
                    })
                })
            }
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepLink = async (req, res) => {
    const {link, userInfo} = req.body
    await db.query("INSERT INTO `step_link` SET ?", {link: link, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepChangeFilter = async (req, res) => {
    const {jql, userInfo} = req.body
    await db.query("INSERT INTO `change_filter` SET ?", {jql: jql, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepGenerationTable = async (req, res) => {
    const {userInfo} = req.body
    await db.query("INSERT INTO `generation_table` SET ?", {user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}

export const stepError = async (req, res) => {
    const {error, userInfo} = req.body
    await db.query("INSERT INTO `errors` SET ?", {error: error, user_id: userInfo.id, date: moment(Date.now()).format('YYYY-MM-DD')}, (err, result) => {
        try {
            res.status(200).json(result)
        } catch (err) {
            errorHandler(res, err)
        }
    })
}
