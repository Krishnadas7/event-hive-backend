import BookingModel from '../../model/bookingModel';
import EventModel from '../../model/eventModel';
import { IBooking } from './../../../../domainLayer/booking';

export const ticketBooking =async (
    booking:IBooking,
    bookingModels:typeof BookingModel,
    eventModels:typeof EventModel
) =>{
    try {
        const event = await EventModel.findByIdAndUpdate(
            booking.event_id,
            { $push: { registrations: booking.user_id } },
            { new: true, useFindAndModify: false }
          );
        const newBooking = await bookingModels.create(booking)
        await newBooking.save()
        return newBooking
    } catch (error) {
        throw error
    }
}