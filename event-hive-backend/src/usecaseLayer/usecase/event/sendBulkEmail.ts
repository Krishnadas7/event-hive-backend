import { S3Client } from "@aws-sdk/client-s3"
import { IEventRepository } from "../../interface/repository/IeventRepository"
import { Is3bucket } from "../../interface/services/Is3Services"
import INodemailer from "../../interface/services/Inodemailer"
import { IResponse } from "../../interface/services/Iresponse"

export const sendBulkEmail = async (
  eventRepository:IEventRepository,
  nodemailer:INodemailer,
  eventId:string,
  url:string
):Promise<IResponse> =>{
   try {
      const participants = await eventRepository.findParticipants(eventId)
      if(participants.length>0){
        const sendEmail = await nodemailer.sendBulkEmail(participants,'hello this from event startign','heyy ur received any email',url)
        return{
          status:200,
          success:true,
          message:sendEmail
        }
      }
      return{
        status:200,
        success:true,
        message:'no participants'
      }
      
   } catch (error) {
     throw error
     
   }
}