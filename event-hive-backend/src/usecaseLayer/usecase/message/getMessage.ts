import { IResponse } from './../../interface/services/Iresponse';
import { IMessageRepository } from './../../interface/repository/ImessageRepository';
import ErrorResponse from '../../handler/errorResponse';
import { IUnreadRepository } from '../../interface/repository/IunreadRepository';
import conversationModel from '../../../infrastructureLayer/database/model/conversatoinModel';
import jwt from 'jsonwebtoken'
export const getMessage = async (
    messageRepository:IMessageRepository,
    unreadRepository:IUnreadRepository,
    conversationId:string,
    userToken:string
):Promise<IResponse>=>{
    try {
        const message = await messageRepository.getMessage(conversationId)
        console.log('usss========================================',userToken);
        
        const decoded:any =await  jwt.verify(userToken,'refreshtokenkey123',(err,res)=>{
            if(err){
                throw ErrorResponse.badRequest('token not verified')
            }
            return res
        })
        const conversation = await conversationModel.findOne({_id:conversationId})
        if(decoded){
            const receiverId = conversation?.members?.find((id)=>id!=decoded.id)
            const deleteCount = await unreadRepository.removeChatNotification(receiverId as string,decoded.id)
        }
        
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