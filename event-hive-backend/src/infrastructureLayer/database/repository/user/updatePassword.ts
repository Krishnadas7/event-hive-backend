import { IUser } from "../../../../domainLayer/user";
import UserModel from "../../model/userModel";

export const updatePassword = async (
    newPassword:string,
    email:string,
    userModels:typeof UserModel
) =>{
    try {
      const user:any = await userModels.findOne({email:email})
       if(user){
         user.password=newPassword
        user.save()
       }else{
        return false
       }
       
      

        return true
    } catch (error) {
        throw error
    }
}