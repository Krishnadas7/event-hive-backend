import { IBooking } from "../../../domainLayer/booking";
import { IBookingRepository } from "../../../usecaseLayer/interface/repository/IbookingRepository";
import BookingModel from "../model/bookingModel";
import EventModel from "../model/eventModel";
import { ticketBooking } from "./booking/ticketBooking";
import { allBookings } from "./booking/allBookings";
import { liveChecking } from "./booking/liveChecking";
import { liveListing } from "./booking/liveListing";

export class BookingRepository implements IBookingRepository{
    private readonly eventModel:typeof EventModel;
    constructor(private readonly bookingModel:typeof BookingModel,
        eventModel=EventModel
    ){
        this.eventModel=eventModel
    }
    async ticketBooking(booking: IBooking): Promise<IBooking> {
        return ticketBooking(booking,this.bookingModel,this.eventModel)
    }
    async allBookings(userId: string): Promise<IBooking[]> {
        return allBookings(userId,this.bookingModel)
    }
    async liveChecking(userId: string): Promise<any> {
        return liveChecking(userId,this.bookingModel)
    }
    async liveListing(userId: string): Promise<any> {
        return liveListing(userId,this.bookingModel)
    }
}