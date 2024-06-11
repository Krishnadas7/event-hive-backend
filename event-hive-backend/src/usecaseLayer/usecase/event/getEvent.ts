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
    
    return{
        status:200,
        success:true,
        message:'blocked successfully',
        data:events
    }
 } catch (error) {
    throw error
 }
}