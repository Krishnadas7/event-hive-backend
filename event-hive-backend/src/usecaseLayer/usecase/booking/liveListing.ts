import { IBooking } from "../../../domainLayer/booking";
import ErrorResponse from "../../handler/errorResponse";
import { IBookingRepository } from "../../interface/repository/IbookingRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";


export const liveListing = async(
    bookingRepository:IBookingRepository,
    s3service: Is3bucket,
    s3: S3Client,
    userId:string
) =>{
 try {
        const live:IBooking[] = await bookingRepository.liveListing(userId)
        const urlPromise = live.map(async(details)=>{
            const url = await s3service.getImages(s3,details.eventDetails.event_poster as string)
            details.eventDetails.event_poster = url
        })
        await Promise.all(urlPromise)
        if(live){
            return {
                status:200,
                success:true,
                message:'datas',
                data:live
            }
        }
       throw ErrorResponse.badRequest('something went wrong')
    } catch (error) {
        throw error
    }
}