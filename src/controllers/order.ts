import { Request, Response } from "express";
import services from "../services/index.js";
import { validateCreateOrder } from "middleware/order.validators.js";
import { validationResult } from "express-validator";

const { OrderService, UserService } = services;

export const createOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    const order = await OrderService.createOrder(req.body);
    res.status(201).json(order);
    return;
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};

export const getOrderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await OrderService.getOrderById(req.params.id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllOrders = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const orders = await OrderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await OrderService.updateOrder(req.params.id, req.body);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteOrder = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const order = await OrderService.deleteOrder(req.params.id);
    if (order) {
      res.status(200).json({ message: "Order deleted successfully" });
      return;
    } else {
      res.status(404).json({ message: "Order not found" });
      return;
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    return;
  }
};
