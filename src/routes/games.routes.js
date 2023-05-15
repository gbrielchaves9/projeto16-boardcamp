import { Router } from "express";
import { create } from "../controllers/games.controller.js";
import { validSchemaGames } from "../middlewares/games.middleware.js";
const GameRouter = Router()

GameRouter.post('/games', validSchemaGames,create)

export default  GameRouter 