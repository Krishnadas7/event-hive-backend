import { IEventRepository } from "../../interface/repository/IeventRepository"

export const blockEvent = async (
    eventRespository:IEventRepository,
    eventId:string
)=>{
 try {
    const blocked = await eventRespository.blockEvent(eventId)
    return{
        status:200,
        success:true,
        message:'blocked successfully',
    }
 } catch (error) {
    throw error
 }
}