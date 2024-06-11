import { IResponse } from './../../interface/services/Iresponse';
import { IMessageRepository } from './../../interface/repository/ImessageRepository';
import ErrorResponse from '../../handler/errorResponse';
export const getMessage = async (
    messageRepository:IMessageRepository,
    conversationId:string
):Promise<IResponse>=>{
    try {
        const message = await messageRepository.getMessage(conversationId)
        if(message){
            return {
                status:200,
                success:true,
                message:'message',
                data:message
            }
        }

        throw ErrorResponse.badRequest('no message is left')
    } catch (error) {
        throw error
    }
    

}