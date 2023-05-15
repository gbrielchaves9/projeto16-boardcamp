import { createSchemaCust } from "../schemas/customers.schema.js";
import { db } from "../configs/database.js";

export async function validSchemaCust(req, res, next) {
  const customer = req.body;
  const { error } = createSchemaCust.validate(customer);
  if (error) {
    const errors = error.details.map((details) => details.message);
    return res.status(400).send({ errors });
  }

  const existingCustomer = await db.query('SELECT * FROM customers WHERE cpf = $1', [customer.cpf]);
  if (existingCustomer.rows.length > 0) {
    return res.status(409).send({ error: "O CPF já está cadastrado no banco de dados." });
  }

  res.locals.customer = customer;
  next();
}