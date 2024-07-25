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
      let amount
      if(req.body.ticket_type==='paid'){
        amount=req.body.ticket_amount
      }else{
        amount='0'
      }
      let obj:any  ={
        participants:req.body.participants,
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
         ticket:req.body.ticket_type,
         amount:amount
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
      res.status(details.status).json({
        success:details.success,
        message:details.message,
        data:details.data
      })
    }catch(error){
     console.log(error)
    }
  }
  async liveEvents (req: Req,res: Res,next: Next) {
    try{
      const companyId = req.query.companyId
      const events = await this.eventusecase.liveEvents(companyId as string)
      res.status(events.status).json({
        success:events.success,
        message:events.message,
        data:events.data
      })
    }catch(error){
      console.log(error)
    }
  }
  async userEventList (req: Req,res: Res,next: Next){
     try { 
      const pagination : any= req.query.pagination 
       const events = await this.eventusecase.userEventList(pagination)
       
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
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async searchEvent (req: Req,res: Res,next: Next){
    try {
      const search = req.query.search
      const event = await this.eventusecase.searchEvent(search as string)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async filterEvents(req: Req,res: Res,next: Next){
    try {
      let obj={
        type:req.query.type,
        ticket:req.query.ticket,
        date:req.query.date
      }
      const event = await this.eventusecase.filterEvents(obj as any)
      res.status(event.status).json({
        success:event.success,
        message:event.message,
        data:event.data
      })
    } catch (error) {
      console.log(error)
    }
  }
  async allMembers(req: Req,res: Res,next: Next){
   try {
    const eventId = req.query.eventId
     const members = await this.eventusecase.allMembers(eventId as string)
     res.status(members.status).json({
      success:members.success,
      message:members.message,
      data:members.data
    })
   } catch (error) {
    next(error)
   }
  }
  async closeEvent(req:Req,res:Res,next:Next){
    try {
      const eventId=req.body.eventId
      const close =  await this.eventusecase.closeEvent(eventId)
      res.status(close.status).json({
        success:close.success,
        message:close.message,
        data:close.data
      })
    } catch (error) {
      next(error)
    }
  }
  async sendBulkEmail(req:Req,res:Res,next:Next){
    try {
      const eventId=req.body.eventId
      const url = req.body.url
      console.log('====',eventId,url)
      const sendEmail = await this.eventusecase.sendBulkEmail(eventId,url)
      res.status(sendEmail.status).json({
        success:sendEmail.success,
        message:sendEmail.message,
      })
    } catch (error) {
      next(error)
    }
  }
}