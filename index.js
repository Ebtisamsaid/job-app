import express from "express"
import Bootstrap from "./src/app.controller.js"
import "./src/cleanupotp/cleanupOTP.js"
const app=express()

const port = 5000
await Bootstrap(app,express)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))