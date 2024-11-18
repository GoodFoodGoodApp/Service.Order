// Validators

import { OrderStatus } from "models/interfaces/order.interface.js";

// Return false when the order is yet a cart, true when the order has been placed
export const validateAsOrder = function (this: any, value: string): boolean {
  if (this.status == OrderStatus.PENDING) {
    return false;
  }
  return true;
};
