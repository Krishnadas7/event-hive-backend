import { IBooking } from "../../../domainLayer/booking";
import { ISalesReport } from "../../../infrastructureLayer/types/salesReport";

export interface IBookingRepository{
  ticketBooking(booking:IBooking):Promise<IBooking>;
  allBookings(userId:string):Promise<IBooking[]>;
  liveChecking(userId:string):Promise<any>;
  liveListing(userId:string):Promise<IBooking[]>;
  todaySales():Promise<number>;
  totalSales():Promise<number>;
  filterSalesReport(pagination:string):Promise<ISalesReport[]>;
}