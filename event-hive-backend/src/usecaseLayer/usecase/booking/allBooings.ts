import { IBookingRepository } from "../../interface/repository/IbookingRepository";


export const allBookings = async(
  bookingRepository:IBookingRepository,
  userId:string 
) =>{
    try {
        const bookings = await bookingRepository.allBookings(userId)
        return {
            status:200,
            success:true,
            message:'booked events',
            data:bookings
        }
    } catch (error) {
        throw error
    }
}