import mongoose,{Document,Model,Schema,Types} from "mongoose";
import {IEvent} from '../../../domainLayer/event'
const eventSchema: Schema = new Schema<IEvent & Document>(
    {
        event_name:{
            type:String
        },
        event_type:{
            type:String
        },
        start_date:{
            type:String
        },
        starting_time:{
            type:String
        },
        end_date:{
            type:String
        },
        ending_time:{
            type:String
        },
        is_block:{
            type:Boolean,
            default:false
        },
        users_limit:{
            type:String
        },
        event_description:{
            type:String
        },
        event_poster:{
            type:String
        },
        company_id: {
            type: Types.ObjectId,
            ref: 'Company',
            required: true
        },
        registrations:{
            type:[String],
        },
    },{
        timestamps:true
    }
)
const  EventModel : Model<IEvent & Document> = mongoose.model<IEvent & Document>('Event',eventSchema)
export default EventModel