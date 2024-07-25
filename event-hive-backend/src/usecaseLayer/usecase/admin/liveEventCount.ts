import ErrorResponse from "../../handler/errorResponse";
import { IEventRepository } from "../../interface/repository/IeventRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const liveEventCount = async (
    eventRepository:IEventRepository
) =>{
  try {
    const liveC = await eventRepository.liveEventCount()
    console.log('liv cccc',liveC)
        return {
            status: 200,
            success: true,
            data: liveC,
            message: 'Users Count'
        };
    
  } catch (error) {
    throw error
  }
}