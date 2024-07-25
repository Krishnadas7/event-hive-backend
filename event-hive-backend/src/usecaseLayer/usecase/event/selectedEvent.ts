import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";

export const selectedEvent = async (
    eventRepository:IEventRepository,
    s3service:Is3bucket,
    s3:S3Client,
    eventId:string
) =>{
    try {
        const event = await eventRepository.selectedEvent(eventId)
        const url = await s3service.getImages(s3,eventId)
        event[0].event_poster = url
        console.log('=event===jjjjj',event)
        if(event){
            return {
             status:200,
             success:true,
             message:'selected event',
             data:event
            }
        }
        throw ErrorResponse.badRequest('no seleced even')
    } catch (error) {
        throw error
    }
}