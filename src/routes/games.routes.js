import { Router } from "express";
import { create , listGame } from "../controllers/games.controller.js";
import { validSchemaGames } from "../middlewares/games.middleware.js";
const GameRouter = Router()
GameRouter.get("/games", listGame)
GameRouter.post('/games', validSchemaGames,create)

export default  GameRouter 