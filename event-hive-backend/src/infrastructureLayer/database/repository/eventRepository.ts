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
import { searchEvent } from "./event/searchEvent";
import { filterEvents } from "./event/filterEvents";
import { liveEvents } from "./event/liveEvents";
import { allMembers } from "./event/allMembers";
import { closeEvent } from "./event/closeEvent";

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
    async userEventList(pagination:number): Promise<IEvent[]> {
        return userEventList(pagination,this.eventModels)
    }
    async selectedEvent(eventId: string): Promise<any> {
        return selectedEvent(eventId,this.eventModels)
    }
    async  searchEvent(search: string): Promise<IEvent[]> {
        return searchEvent(search,this.eventModels)
    }
    async filterEvents(type: string, ticket: string, date: string): Promise<IEvent[]> {
        return filterEvents(type,ticket,date,this.eventModels)
    }
    async liveEvents(companyId: string): Promise<IEvent[]> {
        return liveEvents(companyId,this.eventModels)
    }
    async allMembers(eventId: string): Promise<any> {
        return allMembers(eventId,this.eventModels)
    }
    async closeEvent(eventId: string): Promise<boolean> {
        return closeEvent(eventId,this.eventModels)
    }
}