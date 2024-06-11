import { IConversationRepostitory } from "../../interface/repository/IconversationRepository";
import { ICONdata } from "../../interface/services/Iresponse";
export const addConversation = async (
    senderId:string,
    receiverId:string,
    conversationRepository:IConversationRepostitory,
):Promise<ICONdata >=>{
   try {
     const newConversation = await conversationRepository.addConversation(senderId,receiverId)
      return {
        status:200,
        success:true,
        message:'conversation added',
        data:newConversation
      }
   } catch (error) {
    throw error
   }
}