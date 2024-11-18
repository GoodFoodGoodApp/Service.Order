export interface IOrderItem {
  dishId: string;
  quantity: number;
  unitPrice: number;
  specialInstructions?: string;
}

export interface IOrder {
  _id?: string;
  restaurantId: string;
  customerId: string;
  items: IOrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress?: {
    street: string;
    city: string;
    postalCode: string;
    additionalInfo?: string;
  };
  createdAt: Date;
  updatedAt: Date;
  estimatedDeliveryTime?: Date;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
}

export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  PREPARING = "PREPARING",
  READY = "READY",
  IN_DELIVERY = "IN_DELIVERY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export enum PaymentStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
}

export enum PaymentMethod {
  CREDIT_CARD = "CREDIT_CARD",
  CASH = "CASH",
  MOBILE_PAYMENT = "MOBILE_PAYMENT",
}
