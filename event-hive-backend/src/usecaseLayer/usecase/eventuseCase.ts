import { IEventRepository } from "../interface/repository/IeventRepository";
import { S3Client } from "@aws-sdk/client-s3";
import { Is3bucket } from '../interface/services/Is3Services';
import { IRedis } from "../interface/services/Iredis";
import { createEvent } from "./event/createEven";
import { getEventWithCompany } from "./event/getEventWithCompany";
import mongoose,{Types} from "mongoose";
import { blockEvent } from "./event/blockEvent";
import { getEvent } from "./event/getEvent";
import { userEventList } from "./event/userEventList";
import { selectedEvent } from "./event/selectedEvent";
export class EventUseCaase {
  private readonly eventRepository :IEventRepository;
  private readonly redis: IRedis
  private readonly s3Service:Is3bucket;
  private readonly s3:S3Client;
  constructor(
    eventRepsitory:IEventRepository,
    redis:IRedis,
    s3service:Is3bucket,
    s3:S3Client
  ){
    this.eventRepository=eventRepsitory,
    this.redis = redis,
    this.s3Service=s3service,
    this.s3 = s3
  }
  async createEvent({
    event_name,
    event_type,
    start_date,
    starting_time,
    end_date,
    ending_time,
    users_limit,
    event_description,
    company_id,
    event_poster,
  }:{
    event_name:string;
    event_type:string;
    start_date:string;
    starting_time:string;
    end_date:string;
    ending_time:string;
    users_limit:string;
    event_description:string;
    company_id:Types.ObjectId;
    event_poster:Express.Multer.File;
  }){
      return createEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        event_name,
        event_type,
        start_date,
        starting_time,
        end_date,
        ending_time,
        users_limit,
        event_description,
        company_id,
        event_poster,
      )
    }
    async getEventWithCompany(){
      return getEventWithCompany(
        this.eventRepository,
        this.s3Service,
        this.s3,
      )
    }
    async getEvent(companyId:string){
      return getEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        companyId,
      )
    }
    async blockEvent (eventId:string){
      return blockEvent(
        this.eventRepository,
        eventId
      )
    }
    async userEventList (){
      return userEventList(
        this.eventRepository,
        this.s3Service,
        this.s3
      )
    }
    async selectedEvent(eventId:string){
      return selectedEvent(
        this.eventRepository,
        this.s3Service,
        this.s3,
        eventId
      )
    }
}