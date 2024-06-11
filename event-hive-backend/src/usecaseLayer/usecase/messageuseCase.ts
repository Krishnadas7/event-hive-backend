import { IMessageRepository } from "../interface/repository/ImessageRepository";
import { createMessage } from "./message/createMessage";
import { getMessage } from "./message/getMessage";
export class MessageUseCase{
private readonly messageRepository:IMessageRepository
constructor(
    messageRepository:IMessageRepository
){
    this.messageRepository=messageRepository
}
   async createMessage({
    conversationId,
    sender,
    text,
   }:{
    conversationId:string,
    sender:string,
    text:string
   }) {
    return createMessage(
     this.messageRepository,
     conversationId,
     sender,
     text
    )
   }
   async getMessage(conversationId:string){
    return getMessage(
        this.messageRepository,
        conversationId
    )
   }
}