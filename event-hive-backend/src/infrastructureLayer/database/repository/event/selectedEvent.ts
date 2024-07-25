import { IEvent } from "../../../../domainLayer/event"
import EventModel from "../../model/eventModel"
import {Types} from 'mongoose'

export const selectedEvent = async (
    eventId:string,
    eventModels:typeof EventModel
):Promise<IEvent> =>{
 try {
    const event : any= await eventModels.aggregate([
        {
            $match: {
                _id:new Types.ObjectId(eventId) // Assuming _id is of type ObjectId
            }
        },
        {$lookup:{
            from:'companies',
            localField:'company_id',
            foreignField:'_id',
            as:'companyDetails'
        }}
    ])
 return event

 } catch (error) {
    throw error
 }
}