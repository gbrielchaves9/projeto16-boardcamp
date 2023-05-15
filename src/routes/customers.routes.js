import { Router } from "express";
import { createCustomer } from "../controllers/customer.controller.js";
import { validSchemaCust } from "../middlewares/cusOpt.middleware.js";

const cusRouter = Router();

cusRouter.post('/customers', validSchemaCust, createCustomer);

export default cusRouter;