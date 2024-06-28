import BookingModel from "../../model/bookingModel";
import mongoose from 'mongoose';
const { ObjectId } = mongoose.Types;

export const liveChecking = async (
   userId:string,
   bookingModels:typeof BookingModel
) =>{
   try {
    const date = new Date();
      const live:any = await bookingModels.aggregate([
        {$match:{user_id:new ObjectId(userId)}},
        {$lookup:{
            from:'events',
            localField:'event_id',
            foreignField:'_id',
            as:'eventDetails'
        }},
        { $unwind: "$eventDetails" }, // To deconstruct eventDetails array
        {
            $addFields: {
               "eventDetails.start_date": {
                  $dateFromString: { dateString: "$eventDetails.start_date" }
               },
               "eventDetails.end_date": {
                  $dateFromString: { dateString: "$eventDetails.end_date" }
               }
            }
         },
         {
            $match: {
               "eventDetails.start_date": { $lte: date },
               "eventDetails.end_date": { $gte: date },
            }
         },
        
      ])
      console.log('asssslookup=======',live.length,userId)
      return live.length
   } catch (error) {
    throw error
   }
}