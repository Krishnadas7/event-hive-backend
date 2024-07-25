import { IConversationRepostitory } from "../interface/repository/IconversationRepository";
import { addConversation } from "./conversation/addConversation";
import { getConversation } from "./conversation/getConversation";


export class ConversationUseCase{
  private readonly conversationRepository:IConversationRepostitory
  constructor(
    conversationRepository:IConversationRepostitory
  ){
    this.conversationRepository = conversationRepository
  }
  async addConversation({senderId,receiverId}:{senderId:string; receiverId:string}){
    return addConversation(
      senderId,
      receiverId,
      this.conversationRepository
    )
  }
  async getConversation(userId:string){
    console.log('token from usecase',userId)
    return getConversation(
      userId,
      this.conversationRepository
    )
  }
}