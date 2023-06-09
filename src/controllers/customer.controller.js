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

export async function getCustomerById(req, res) {
  const customerId = req.params.id;

  try {
    const result = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    const customer = result.rows[0];

    if (!customer) {
      return res.status(404).send({ error: 'Cliente não encontrado.' });
    }

    res.send(customer);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao buscar o cliente.' });
  }
}



export async function updateCustomer(req, res) {
  const customerId = req.params.id;
  const { name, phone, cpf, birthday } = req.body;

  try {
    // Verificar se o cliente existe
    const existingCustomer = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    if (existingCustomer.rows.length === 0) {
      return res.status(404).send({ error: 'Cliente não encontrado.' });
    }

    // Verificar se o CPF pertence a outro cliente
    const duplicateCPF = await db.query('SELECT * FROM customers WHERE cpf = $1 AND id != $2', [cpf, customerId]);
    if (duplicateCPF.rows.length > 0) {
      return res.status(409).send({ error: 'O CPF pertence a outro cliente.' });
    }

    // Atualizar os dados do cliente
    await db.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5', [name, phone, cpf, birthday, customerId]);

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ error: 'Erro ao atualizar o cliente.' });
  }
}





