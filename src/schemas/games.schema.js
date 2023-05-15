import joi from "joi";

export const createSchemaGame = joi.object({
    name: joi.string().min(2).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().integer().min(1).required(),
    pricePerDay: joi.number().positive().required()
});