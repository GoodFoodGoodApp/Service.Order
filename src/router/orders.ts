import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
  deleteOrder,
} from "../controllers/order.js";
import { validateCreateOrder } from "middleware/order.validators.js";

export default (router: express.Router) => {
  /**
   * @openapi
   * /orders/
   *    post:
   *        summary : Create a new order as a cart
   *        tags : [Orders]
   */
  router.post("/orders", createOrder);

  /**
   * @openapi
   * /orders/{id}:
   *   get:
   *     summary: Get an order by ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the order
   *     responses:
   *       200:
   *         description: Order retrieved successfully
   *       404:
   *         description: Order not found
   *       500:
   *         description: Internal server error
   */
  router.get("/orders/:id", getOrderById);

  /**
   * @openapi
   * /orders:
   *   get:
   *     summary: Get all orders
   *     tags: [Orders]
   *     responses:
   *       200:
   *         description: Orders retrieved successfully
   *       500:
   *         description: Internal server error
   */
  router.get("/orders", getAllOrders);

  /**
   * @openapi
   * /orders/{id}:
   *   put:
   *     summary: Update an order by ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the order
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               status:
   *                 type: string
   *                 description: Status of the order
   *               items:
   *                 type: array
   *                 items:
   *                   type: object
   *                   properties:
   *                     productId:
   *                       type: string
   *                       description: ID of the product
   *                     quantity:
   *                       type: number
   * description: Quantity of the product
   *  *     responses:
   *       200:
   *         description: Order updated successfully
   *       404:
   *         description: Order not found
   *       500:
   *         description: Internal server error
   */
  router.put("/orders/:id", updateOrder);

  /**
   * @openapi
   * /orders/{id}:
   *   delete:
   *     summary: Cancel an order by ID
   *     tags: [Orders]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: ID of the order
   *     responses:
   *       200:
   *         description: Order canceled successfully
   *       404:
   *         description: Order not found
   *       500:
   *         description: Internal server error
   */
  router.delete("/orders/:id", deleteOrder);
};