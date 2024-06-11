import { IMessages } from "../../../domainLayer/messages";
import { IMessageRepository } from "../../../usecaseLayer/interface/repository/ImessageRepository";
import MessageModel from "../model/messageModel";
import { createMessage } from "./message/createMessage";
import { getMessage } from "./message/getMessage";

export class MessageRepository implements IMessageRepository{
   constructor(private readonly messageModels:typeof MessageModel){}
     async createMessage(message:IMessages): Promise<IMessages> {
        return createMessage(message,this.messageModels)
    }
    async getMessage(conversationId: string): Promise<any> {
        return getMessage(conversationId,this.messageModels)
    }
}