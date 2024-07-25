import ErrorResponse from '../../handler/errorResponse';
import { IBookingRepository } from './../../interface/repository/IbookingRepository';


export const totalSales = async (
    bookingRepository:IBookingRepository
) =>{
   try {
      const totalS = await bookingRepository.totalSales()
      if(totalS){
        return {
            status:200,
            success:true,
            data:totalS,
            message:'Today Sales'
        }
      }
      throw ErrorResponse.badRequest('something wrong in total sales')
   } catch (error) {
    throw error
   }
}