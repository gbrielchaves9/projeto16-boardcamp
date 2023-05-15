import { db } from "../configs/database.js";

export async function listCustomers(req, res) {
  try {
    const customers = await db.query('SELECT * FROM customers');
    res.send(customers.rows);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao listar os clientes.' });
  }
}

export async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  try {
    const existingCustomer = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf]);
    if (existingCustomer.rows.length > 0) {
      return res.status(409).send({ error: 'O cliente já existe no banco de dados.' });
    }

    await db.query(`
      INSERT INTO customers (name, phone, cpf, birthday)
      VALUES ($1, $2, $3, $4);
    `, [name, phone, cpf, birthday]);

    res.status(201).send('Cliente criado com sucesso.');
  } catch (error) {
    res.status(500).send(error.message);
  }
}