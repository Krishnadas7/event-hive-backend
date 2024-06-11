import { IConversation } from "../../../domainLayer/conversation"

export interface IConversationRepostitory{
    addConversation(senderId:string,receiverId:string):Promise<IConversation>;
    getConversation(userId:string):Promise<any>;
}