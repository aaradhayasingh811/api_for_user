import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})
import express from "express"
import {connection} from './db/db.js'
import {app} from './app.js'

connection().then(()=>{
    app.listen(process.env.PORT|| 3000,()=>{
        console.log('server is running on port',process.env.PORT);
    })
}).catch((err)=>{
    console.log(err)
})
