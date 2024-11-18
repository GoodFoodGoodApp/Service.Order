import { model } from "mongoose";
import { IUser } from "./interfaces/user.interface.js";
import { UserSchema } from "./schemas/user.schema.js";
import { IOrder } from "./interfaces/order.interface.js";
import OrderSchema from "./schemas/order.schema.js";

export const UserModel = model<IUser>("User", UserSchema);

export const OrderModel = model<IOrder>('Order', OrderSchema);