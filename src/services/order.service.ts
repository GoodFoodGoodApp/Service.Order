import { OrderModel } from "models/index.js";
import { IOrder, OrderStatus } from "models/interfaces/order.interface.js";

class OrderService {
  // Create a new order
  async createOrder(orderData: Partial<IOrder>): Promise<IOrder> {
    const order = new OrderModel(orderData);
    return await order.save();
  }

  // Get an order by ID
  async getOrderById(orderId: string): Promise<IOrder | null> {
    return await OrderModel.findById(orderId).exec();
  }

  // Get all orders
  async getAllOrders(): Promise<IOrder[]> {
    return await OrderModel.find().exec();
  }

  // Update an order by ID
  async updateOrder(
    orderId: string,
    updateData: Partial<IOrder>
  ): Promise<IOrder | null> {
    return await OrderModel.findByIdAndUpdate(orderId, updateData, {
      new: true,
    }).exec();
  }

  // Delete an order by ID
  async deleteOrder(orderId: string): Promise<IOrder | null> {
    return await OrderModel.findByIdAndUpdate(orderId, {
      status: OrderStatus.CANCELLED,
    });
  }
}

export default new OrderService();
