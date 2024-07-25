import { IEventRepository } from "../../interface/repository/IeventRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";
export const getEventWithCompany = async (
      eventRepository:IEventRepository,
      s3service:Is3bucket,
      s3:S3Client
) =>{
    try {
        const events = await eventRepository.getEventWithCompany()
        const urlPromises = events.map(async(event:any)=>{
          try {
            const eventId=event._id.toString()
            const url = await s3service.getImages(s3,eventId as string)
            event.event_poster=url
          } catch (error) {
            event.event_poster=null
          }
        })
        await Promise.all(urlPromises)
        return {
            status:200,
            success:true,
            message:'all events',
            data:events
        }
    } catch (error) {
        throw error
    }
   
}