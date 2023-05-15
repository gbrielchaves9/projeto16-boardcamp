import { createSchemaGame } from "../schemas/games.schema.js";
import { db } from "../configs/database.js";


export async function validSchemaGames(req, res, next) {
  const game = req.body;
  const { error } = createSchemaGame.validate(game);
  if (error) {
    const errors = error.details.map((details) => details.message);
    return res.status(400).send({ errors });
  }

  const existingGame = await db.query('SELECT * FROM games WHERE name = $1', [game.name]);

  if (existingGame.rows.length > 0) {
    return res.status(409).send({ error: "O jogo já existe no banco de dados." });
  }

  
  res.locals.game = game;

  next();
}