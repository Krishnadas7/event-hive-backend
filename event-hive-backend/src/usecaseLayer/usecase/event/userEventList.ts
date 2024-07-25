import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { IResponse } from "../../interface/services/Iresponse";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";

export const userEventList = async (
    eventRepository:IEventRepository,
    s3service:Is3bucket,
    s3:S3Client,
    pagination:number
):Promise<IResponse> =>{
    try {
        const events  = await eventRepository.userEventList(pagination)
        const urlPromises = events.map(async(event:any,index:Number)=>{
            try {
                const url =  await s3service.getImages(s3,event.event_poster)
           event.event_poster=url
            } catch (error) {
                event.event_poster=null
            }
            
        })
        await Promise.all(urlPromises);
        if(events){            
            return {
                status:200,
                success:true,
                message:'all events',
                data:events
            }
        }
        throw ErrorResponse.badRequest('something error')
    } catch (error) {
        throw error
    }
}
