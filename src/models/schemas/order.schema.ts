import { Schema } from "mongoose";
import {
  IOrder,
  OrderStatus,
  PaymentStatus,
  PaymentMethod,
} from "../interfaces/order.interface.js";
import { validateAsOrder } from "./validators.js";

const OrderItemSchema = new Schema({
  dishId: {
    type: String,
    required: true,
    ref: "Dish",
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  specialInstructions: {
    type: String,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    restaurantId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: [
        (items: IOrder["items"]) => items.length > 0,
        "Order must have at least one item",
      ],
    },
    status: {
      type: String,
      enum: OrderStatus,
      default: OrderStatus.PENDING,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      street: { type: String, required: validateAsOrder },
      city: { type: String, required: validateAsOrder },
      postalCode: { type: String, required: validateAsOrder },
      additionalInfo: { type: String },
    },
    paymentStatus: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.PENDING,
    },
    paymentMethod: {
      type: String,
      enum: PaymentMethod,
      validate: {
        validator: validateAsOrder,
        message:
          "Payment method is required when the order status is CONFIRMED",
      },
    },
    estimatedDeliveryTime: {
      type: Date, //TODO ajouter la validation
    },
  },
  {
    timestamps: true,
  }
);

// Indexes pour optimiser les requêtes fréquentes
OrderSchema.index({ restaurantId: 1, createdAt: -1 });
OrderSchema.index({ customerId: 1, createdAt: -1 });
OrderSchema.index({ status: 1 });

// Méthodes du modèle
OrderSchema.methods.calculateTotal = function (): number {
  console.log(this.items);
  if (!Array.isArray(this.items)) {
    console.log("empty array detected", this.items);
    return 0;
  }

  let total = 0;
  this.items.forEach((item: { quantity: number; unitPrice: number }) => {
    console.log("check total in progress");
    total += item.quantity * item.unitPrice;
  });

  return total;

  // return this.items.reduce(
  //   (total: number, item: { quantity: number; unitPrice: number }) =>
  //   {
  //     console.log("check total in progress");

  //     return total + item.quantity * item.unitPrice;
  //   },
  //   0
  // );
};

OrderSchema.methods.canBeCancelled = function () {
  return [OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(this.status);
};

OrderSchema.methods.isCart = function (this: any, value: string) {
  if (this.status == OrderStatus.PENDING) {
    return false;
  }
  return true;
};

// Middleware pre-save pour calculer le montant total
//TODO not working - reduce function unable to calculate right amount
// OrderSchema.pre("save", function (next) {
//   if (!Array.isArray(this.items)) {
//     return 0;
//   }
//   if (this.isModified("items")) {
//     this.totalAmount = OrderSchema.methods.calculateTotal();
//   }
//   next();
// });

export default OrderSchema;
