import { Router } from "express";
import { createCustomer, getCustomerById } from "../controllers/customer.controller.js";
import { validSchemaCust } from "../middlewares/cusOpt.middleware.js";

const cusRouter = Router();

cusRouter.post('/customers', validSchemaCust, createCustomer);
cusRouter.get('/customers/:id', getCustomerById);

export default cusRouter;