import { IEvent } from "../../../domainLayer/event";
import { EventStoreData } from "../services/Iresponse";


export interface IEventRepository{
    createEvent(event:IEvent):Promise<IEvent>;
    uploadProfileImage(image:string,id:string):Promise<Boolean>;
    getEventWithCompany():Promise<any>;
    blockEvent(eventId:string):Promise<boolean>;
    getEvent(companyId:string):Promise<any>;
    userEventList():Promise<IEvent[]>;
    selectedEvent(eventId:string):Promise<any>;
}