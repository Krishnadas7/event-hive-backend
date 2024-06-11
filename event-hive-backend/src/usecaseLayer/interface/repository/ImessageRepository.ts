import { IMessages } from "../../../domainLayer/messages"
export interface IMessageRepository{
    createMessage(message:IMessages):Promise<IMessages>;
    getMessage(conversationId:string):Promise<any>;
}