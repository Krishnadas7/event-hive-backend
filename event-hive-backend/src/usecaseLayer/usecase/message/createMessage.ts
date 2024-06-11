import { IResponse } from './../../interface/services/Iresponse';
import { IMessageRepository } from "../../interface/repository/ImessageRepository";

export const createMessage = async (
    messageRepository:IMessageRepository,
    conversationId:string,
    sender:string,
    text:string
):Promise<IResponse> =>{
     try {
        let obj={
            conversationId,
            sender,
            text
        }
        const newMessage = await messageRepository.createMessage(obj)
        return {
            status:200,
            success:true,
            message:'new message is created',
            data:newMessage
        }
     } catch (error) {
        throw error
     }
}