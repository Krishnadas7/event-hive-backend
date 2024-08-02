import { IEResponse } from './../../interface/services/Iresponse';
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import ErrorResponse from "../../handler/errorResponse";
import { IEvent } from "../../../domainLayer/event";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import {Types} from "mongoose";
import { ObjectId } from 'mongodb';
import { StatusCodes } from "../../../utils/statusCodes"

export const createEvent = async (
        eventRepository:IEventRepository,
        s3service:Is3bucket,
        s3:S3Client,
        participants:string,
        event_name:string,
        event_type:string,
        start_date:string,
        starting_time:string,
        end_date:string,
        ending_time:string,
        users_limit:string,
        event_description:string,
        company_id:Types.ObjectId,
        event_poster:Express.Multer.File,
        ticket:string,
        amount:string
):Promise<IEResponse> =>{

  try {
       const event:IEvent = {
        participants,
        event_name,
        event_type,
        start_date,
        starting_time,
        end_date,
        ending_time,
        users_limit,
        event_description,
        company_id,
        ticket,
        amount
      }
      const newEvent = await eventRepository.createEvent(event)
      
      if(newEvent._id){
        const objectId = new ObjectId(newEvent._id);
        const name = objectId.toHexString();
        const imageUpload = await s3service.profileImageUpdate(s3,event_poster,name as string)
        const posterName = await eventRepository.uploadProfileImage(imageUpload,name)
        console.log(newEvent,imageUpload,posterName)
        return {
            status:StatusCodes.OK,
            success:true,
            message:`event created successfully`,
            data:newEvent 
        }
        
      }
      throw ErrorResponse.badRequest('something wrong')
  } catch (error) {
     throw error
  }
  
  
}