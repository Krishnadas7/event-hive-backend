import { IEvent } from "../../../domainLayer/event"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { Is3bucket } from "../../interface/services/Is3Services"
import { S3Client } from "@aws-sdk/client-s3"
export const getEvent = async (
        eventRespository:IEventRepository,
        s3service:Is3bucket,
        s3:S3Client,
        eventId:string
)=>{
 try {
    const events = await eventRespository.getEvent(eventId)
    const urlPromise = events.map(async(event:IEvent,index:number)=>{
        const url = await s3service.getImages(s3,event.event_poster as string)
        event.event_poster = url
    })
    await Promise.all(urlPromise)
    return{
        status:200,
        success:true,
        message:'company events',
        data:events
    }
 } catch (error) {
    throw error
 }
}