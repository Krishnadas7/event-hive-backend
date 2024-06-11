import EventModel from "../../model/eventModel";
import { Document, Model, ObjectId } from "mongoose";
import { IEvent } from "../../../../domainLayer/event";
export const userEventList =async (
    eventModels:typeof EventModel
):Promise<IEvent[]> =>{
    try {
        const todayDate = new Date()
        const events = await eventModels.find({
            start_date: { $gt: todayDate.toISOString().split('T')[0] }
          });
          return events
    } catch (error) {
        throw error
    }
}