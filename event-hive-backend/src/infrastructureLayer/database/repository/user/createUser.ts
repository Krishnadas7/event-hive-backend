import { IUser } from "../../../../domainLayer/user";
import UserModel from "../../model/userModel";
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";

export const createUser=async (
    newUser: IUser,
    userModels: typeof UserModel
): Promise<StoreData>=>{ 
  try { 
    console.log('infra reposi user create user page ');
    
    const user = await userModels.create(newUser)
    user.is_verified=true
    await user.save()
    const responseData: StoreData = {
        _id:user._id,
        email:user.email,
        name:user.first_name,
    }
    return responseData
  } catch (error) {
    throw error
  }
}