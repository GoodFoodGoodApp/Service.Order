import { UserModel } from "../models/index.js";

class UserService {
  getUsers = () => UserModel.find();
  getUserByEmail = (email: string) => UserModel.findOne({ email });
  getUserBySessionToken = (sessionToken: string) =>
    UserModel.findOne({ "authentication.sessionToken": sessionToken });
  getUserById = (id: string) => UserModel.findById(id);

  createUser = (values: Record<string, any>) =>
    new UserModel(values).save().then((user) => user.toObject());
  deleteUserById = (id: string) => UserModel.findOneAndDelete({ _id: id });
  updateUserById = (id: string, values: Record<string, any>) =>
    UserModel.findByIdAndUpdate(id, values);
}

export default new UserService();
