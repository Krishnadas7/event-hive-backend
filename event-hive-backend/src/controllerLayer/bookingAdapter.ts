import { BookingUseCase } from "../usecaseLayer/usecase/bookinguseCase";
import { Next,Req,Res } from "../infrastructureLayer/types/expressTypes";

export class BookingAdapter{
    private readonly bookingusecase:BookingUseCase;
    constructor(bookingusecase:BookingUseCase){
        this.bookingusecase=bookingusecase
    }
    async ticketBooking(req:Req,res:Res,next:Next){
        try {
            const booking = await this.bookingusecase.ticketBooking(req.body)
            console.log('booking',booking)
             if(booking){
                res.status(booking.status).json({
                    success:booking.success,
                    message:booking.message,
                    data:booking.data
                })
             }
        } catch (error) {
           next(error)
        }
    }
    async allBookings(req:Req,res:Res,next:Next){
      try {
        const userId = req.query.userId
         const booking = await this.bookingusecase.allBookings(userId as string)
         if(booking){
          res.status(booking.status).json({
              success:booking.success,
              message:booking.message,
              data:booking.data
          })
       }
      } catch (error) {
        next(error)
      }
    }
    async liveChecking(req:Req,res:Res,next:Next){
         try {
          const userId = req.query.userId
          const live = await this.bookingusecase.liveChecking(userId as string)
          res.status(live.status).json({
            data:live.data,
            message:live.message,
            success:live.success
          })
         } catch (error) {
          next(error)
         }
    }
    async liveListing(req:Req,res:Res,next:Next){
      try {
        const userId = req.query.userId
        const live = await this.bookingusecase.liveListing(userId as string)
        res.status(live.status).json({
          data:live.data,
          message:live.message,
          success:live.success
        })
       } catch (error) {
        next(error)
       }
    }
 
    async webhook(req: Req, res: Res, next: Next) {
        try {
          // Parse the incoming webhook event
          const event = req.body;
          // Check the type of event
          switch (event.type) {
            case "checkout.session.completed":
              // Handle charge succeeded event
              const session = event.data.object;
              const metadata = session.metadata;
              const bookingId = metadata.bookingId;
              const user_id = metadata.user_id;
              const amount = metadata.amount;
              const transactionId = event.data.object.payment_intent;
              await this.bookingusecase.paymentConfirmation({
                transactionId,
                bookingId,
                user_id,
                amount,
              });
              break;
            default:
              console.log(`Unhandled event type: ${event.type}`);
          }
    
          // Respond with a success message
          res.status(200).json({ received: true });
        } catch (error) {
          next(error);
        }
      }
}