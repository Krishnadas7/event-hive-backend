import BookingModel from "../../model/bookingModel";

export const allBookings = async (
    userId:string,
    bookingModels:typeof BookingModel
) =>{
  try {
    const bookings = await bookingModels.find({user_id:userId})
    return bookings
  } catch (error) {
    throw error
  }
} 