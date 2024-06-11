import EventModel from "../../model/eventModel";
import {IEvent} from '../../../../domainLayer/event'
export const blockEvent = async (
    eventId:string,
    eventModels:typeof EventModel
):Promise<boolean> =>{
    try {
        const blocked:any= await eventModels.findOne({_id:eventId})
        if(blocked){
            blocked.is_block = !blocked?.is_block
        blocked.save()
        return true
        }
        return false
      
    } catch (error) {
        throw error
    }
}