import UserModel from "../../model/userModel";
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";

export const uploadUserImage = async (
    imageName:string,
    id:string,
    userModel:typeof UserModel
) :Promise<Boolean> =>{
   
  const result = await userModel.updateOne({_id:id},{$set:{profileImage:imageName}})
   if(result.modifiedCount==1){
    return true
   }else{
    return false
   }
}