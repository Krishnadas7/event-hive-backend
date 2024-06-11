import EventModel from "../../model/eventModel";
import { StoreData } from "../../../../usecaseLayer/interface/services/Iresponse";

export const updatePosterName = async (
    imageName:string,
    id:string,
    eventModel:typeof EventModel
) :Promise<Boolean> =>{
   
  const result = await eventModel.updateOne({_id:id},{$set:{event_poster:imageName}})
   if(result.modifiedCount==1){
    return true
   }else{
    return false
   }
}