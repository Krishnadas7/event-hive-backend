import { IEvent } from "../../../../domainLayer/event";
import EventModel from "../../model/eventModel";
import { Types } from "mongoose";

export const getEvent = async (
    companyId: string,
    eventModel: typeof EventModel
) => {
    try {
        let query;

        if (Types.ObjectId.isValid(companyId) && companyId.length === 24) {
            query = { company_id: new Types.ObjectId(companyId) };
        } else {
            query = { company_email: companyId };
        }

        const event = await eventModel.find(query);
        return event;
    } catch (error) {
        throw error;
    }
};
