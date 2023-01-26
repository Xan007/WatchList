import config from "config"
import express from "express"
import cors from "cors"
import morgan from "morgan"

const host = config.get("server.host")
const port = config.get("server.port")

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const listener = app.listen(port, host, () => {
    console.log(`Server listening on port ${listener.address().port}`)
})
