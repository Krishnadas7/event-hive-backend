import { IBooking } from "../../../domainLayer/booking";

export interface IBookingRepository{
  ticketBooking(booking:IBooking):Promise<IBooking>;
  allBookings(userId:string):Promise<IBooking[]>;
  liveChecking(userId:string):Promise<any>;
  liveListing(userId:string):Promise<IBooking[]>;
}