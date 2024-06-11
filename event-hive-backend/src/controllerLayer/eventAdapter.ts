import { EventUseCaase } from "../usecaseLayer/usecase/eventuseCase";
import { Next,Res,Req } from "../infrastructureLayer/types/expressTypes";

export class EventAdapter{
 private readonly eventusecase : EventUseCaase;
 constructor(eventusecase:EventUseCaase){
    this.eventusecase = eventusecase
 }
  async createEvent(req: Req,res: Res,next: Next){
    try {
      const event_poster = req.file
      let obj:any  ={
         event_name:req.body.event_name,
         event_type:req.body.event_type,
         start_date:req.body.start_date,
         starting_time:req.body.starting_time,
         end_date:req.body.end_date,
         ending_time:req.body.ending_time,
         users_limit:req.body.users_limit,
         event_description:req.body.event_description,
         company_id:req.body.company_id,
         event_poster:event_poster,
      }
       const newEvent = await this.eventusecase.createEvent(obj)
        res.status(newEvent.status).json({
         success:newEvent.success,
         message:newEvent.message,
         data:newEvent.data
        })
    } catch (error) {
      console.log(error)
    }
  }
  async eventWithCompany (req: Req,res: Res,next: Next){
    try {
       const eventWithCompany = await this.eventusecase.getEventWithCompany()
       console.log('eventwithCompany====',eventWithCompany)
       res.status(eventWithCompany.status).json({
        success:eventWithCompany.success,
        message:eventWithCompany.message,
        data:eventWithCompany.data
       })
    } catch (error) {
       console.log(error)
    }
  }
  async blockEvent( req: Req,res: Res, next: Next){
    try {
      const eventId : string = req.body.eventId
      const blocked = await this.eventusecase.blockEvent(eventId)
      res.status(blocked.status).json({
        success:blocked.success,
        message:blocked.message
      })
    } catch (error) {
      console.log(error)
    }
  }
  async getCompany (req: Req,res: Res,next: Next) {
    try{
      const companyId = req.query.companyId
      const details = await this.eventusecase.getEvent(companyId as string)
      console.log('geteventsss====',details)
      res.status(details.status).json({
        success:details.success,
        message:details.message
      })
    }catch(error){
     console.log(error)
    }
  }
  async userEventList (req: Req,res: Res,next: Next){
     try {
       const events = await this.eventusecase.userEventList()
       
       if(events){
        res.status(events.status).json({
          success:events.success,
          message:events.message,
          data:events.data
        })
       }else{
        res.status(500).json({
          success: false,
          message: 'Failed to create user or user data is missing.',
          data: null,
      });
       }
      
     } catch (error) {
      console.log(error)
     }
  }
  async selectedEvent (req: Req,res: Res,next: Next){
    try {
      const eventId = req.query.eventId

      const event = await this.eventusecase.selectedEvent(eventId as string)
      console.log('=====',event)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
}