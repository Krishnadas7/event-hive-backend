import { ICONdata, IResponse } from "../../interface/services/Iresponse";
import { IConversationRepostitory } from "../../interface/repository/IconversationRepository";
import { IConversation } from "../../../domainLayer/conversation";
import ErrorResponse from "../../handler/errorResponse";
export const getConversation = async (
    userId:string,
    conversationRepository:IConversationRepostitory
):Promise<IResponse> =>{
    try {
        const conversation  = await conversationRepository.getConversation(userId)
        if(conversation){
        return {
            status:200,
            success:true,
            message:'new conversations',
            data:conversation
        }
    }
    return {
        status:401,
        success:false,
        message:'no conversation',
    }
    //  throw ErrorResponse.badRequest('invaild')
    } catch (error) {
        throw error
    }
    
}