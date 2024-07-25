import ErrorResponse from '../../handler/errorResponse';
import { IResponse } from '../../interface/services/Iresponse';
import { IBookingRepository } from './../../interface/repository/IbookingRepository';

export const todaySales = async (
    bookingRepository:IBookingRepository
):Promise<IResponse>=>{
  try {
     const todayS = await bookingRepository.todaySales()
     if(todayS){
        return {
            status:200,
            success:true,
            data:todayS,
            message:'Today Sales'
        }
     }
     throw ErrorResponse.badRequest('something wrong in today sales')
  } catch (error) {
    throw error
  }
}