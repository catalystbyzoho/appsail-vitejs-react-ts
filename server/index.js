const path = require("path")
const express = require('express')

const app = express()
app.use(express.json())
app.use("/",express.static(path.join(__dirname,"../client")));

app.listen(process.env.X_ZOHO_CATALYST_LISTEN_PORT,()=>{
    console.log(`Listening from port ${process.env.X_ZOHO_CATALYST_LISTEN_PORT} !!!`)
})

module.exports = app;
