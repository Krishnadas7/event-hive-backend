import mongoose,{Document,Model,Schema,Types} from "mongoose";

export interface IEvent{
    _id?:string;
    event_name?:string;
    event_type?:string;
    start_date?:string;
    starting_time?:string;
    end_date?:string;
    ending_time?:string;
    users_limit?:string;
    event_description?:string;
    registrations?:string[];
    is_block?:boolean;
    event_poster?:Express.Multer.File;
    company_id?:Types.ObjectId; 
}