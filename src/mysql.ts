import mysql from 'mysql2/promise'
import { config } from 'dotenv'

config()

export const pool = mysql.createPool({
    host: process.env.HOST_DATABASE ,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.DATABASE,
    port: Number(process.env.PORT_DATABASE)
})




