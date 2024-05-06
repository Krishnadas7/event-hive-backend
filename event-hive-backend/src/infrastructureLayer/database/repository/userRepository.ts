import { IUser } from "../../../domainLayer/user";
import { StoreData } from "../../../usecaseLayer/interface/services/Iresponse";
import UserModel from "../model/userModel";
import { createUser } from "./user/createUser";
import { findUser } from "./user/findUser";
import { IUserRepository } from "../../../usecaseLayer/interface/repository/IuserRepository";
import { blockUser } from "./user/blockUser";
import { IforgotPassword } from "../../../usecaseLayer/interface/services/Iresponse";
import { forgotPassword } from "./user/forgotPassword";

export class UserRepository implements IUserRepository{
    constructor(private readonly usersModel:typeof UserModel){}

     async createUser(newUser: IUser): Promise<StoreData> {
        return createUser(newUser, this.usersModel)
    }
     async findUser(email: string): Promise<IUser | null> {
        return findUser(email,this.usersModel)
    }
     async blockUser(_id: string): Promise<string | null> {
        return blockUser(_id,this.usersModel)    
    }
    async forgotPassword(newPassword: IforgotPassword): Promise<StoreData> {
        return forgotPassword(newPassword, this.usersModel);
      }
}