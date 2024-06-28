import { IEvent } from "../../../../domainLayer/event";
import EventModel from "../../model/eventModel";
import { Types } from "mongoose";

export const getEvent = async (
    companyId: string,
    eventModel: typeof EventModel
) => {
    try {
        const event = await eventModel.find({company_id: companyId});
        console.log('999999999999999999',event)
        return event;
    } catch (error) {
        throw error;
    }
};
