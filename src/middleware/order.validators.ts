import { body, param } from "express-validator";

export const validateCreateOrder = [
  body("restaurantId").isString().withMessage("Restaurant ID must be a string"),
  body("customerId").isString().withMessage("Customer ID must be a string"),
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be an array with at least one item"),
  body("items.*.productId")
    .isString()
    .withMessage("Product ID must be a string"),
  body("items.*.quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0"),
  body("totalAmount")
    .isFloat({ gt: 0 })
    .withMessage("Total amount must be a number greater than 0"),
];

export const validateOrderId = [
  param("id").isMongoId().withMessage("Invalid order ID"),
];
