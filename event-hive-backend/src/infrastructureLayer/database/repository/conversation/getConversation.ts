import ConversationModel from "../../model/conversatoinModel"
import jwt from 'jsonwebtoken'

export const getConversation = async (
  userId:string,
  conversationModels:typeof ConversationModel
) =>{
    try {
        console.log('token',userId)
        // const decoded:any = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string)
        // console.log(decoded)
         const conversations = await conversationModels.find({
            members:{$in:[userId]},
         }).sort({ updatedAt: -1 }); 
         return conversations
    } catch (error) {
        throw error
    }
}