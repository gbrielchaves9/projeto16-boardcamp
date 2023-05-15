import  express  from "express";
import cors from "cors";
import dotenv from "dotenv"
import GameRouter from "./routes/games.routes.js";
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(GameRouter)
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`))