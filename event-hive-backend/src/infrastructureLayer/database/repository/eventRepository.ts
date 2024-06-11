import { IEvent } from "../../../domainLayer/event";
import { IEventRepository } from "../../../usecaseLayer/interface/repository/IeventRepository";
import EventModel from "../model/eventModel";
import { createEvent } from "./event/createEvent";
import { updatePosterName } from "./event/updatePosterName";
import { getEventWithCompany } from "./event/getEventWithCompany";
import { blockEvent } from "./event/blockEvent";
import { getEvent } from "./event/getEvent";
import { userEventList } from "./event/userEventList";
import { selectedEvent } from "./event/selectedEvent";

export class EventRepository implements IEventRepository{
    constructor(private readonly eventModels:typeof EventModel){}
    async createEvent(event:IEvent):Promise<IEvent>{
        return createEvent(event,this.eventModels)
    }
    async uploadProfileImage(image:string,id:string):Promise<Boolean>{
        return  updatePosterName(image,id,this.eventModels)
    }
    async getEventWithCompany(): Promise<any> {
        return getEventWithCompany(this.eventModels)
    }
    async blockEvent(eventId: string): Promise<boolean> {
        return blockEvent(eventId,this.eventModels)
    }
    async getEvent(companyId: string): Promise<any> {
        return getEvent(companyId,this.eventModels)
    }
    async userEventList(): Promise<IEvent[]> {
        return userEventList(this.eventModels)
    }
    async selectedEvent(eventId: string): Promise<any> {
        return selectedEvent(eventId,this.eventModels)
    }
}