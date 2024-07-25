import { IEvent } from "../../../domainLayer/event";


export interface IEventRepository{
    createEvent(event:IEvent):Promise<IEvent>;
    uploadProfileImage(image:string,id:string):Promise<Boolean>;
    getEventWithCompany():Promise<any>;
    blockEvent(eventId:string):Promise<boolean>;
    getEvent(companyId:string):Promise<any>;
    userEventList(pagination:number):Promise<IEvent[]>;
    selectedEvent(eventId:string):Promise<any>;
    searchEvent(search:string):Promise<IEvent[]>;
    filterEvents(type:string,ticket:string,date:string):Promise<IEvent[]>;
    liveEvents(companyId:string):Promise<IEvent[]>;
    allMembers(eventId:string):Promise<any>;
    closeEvent(eventId:string):Promise<boolean>;
    findParticipants(eventId:string):Promise<any>;
    eventCount():Promise<number>;
    liveEventCount():Promise<number>;
    piechartData():Promise<string[]>
    checkingUserExist(userId:string,eventId:string):Promise<boolean>
}