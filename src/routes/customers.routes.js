import { Router } from "express";
import { createCustomer, listCustomers, getCustomerById, updateCustomer } from "../controllers/customer.controller.js";
import { validSchemaCust } from "../middlewares/cusOpt.middleware.js";

const cusRouter = Router();

cusRouter.post('/customers', validSchemaCust, createCustomer);
cusRouter.get('/customers', listCustomers);
cusRouter.get('/customers/:id', getCustomerById);
cusRouter.put('/customers/:id', validSchemaCust, updateCustomer);

export default cusRouter;