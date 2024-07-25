export interface IUnreadRepository{
    addChatNotification(senderId:string,receiverId:string):Promise<any>;
    getUserNotifications(userId:string):Promise<any>;
    removeChatNotification(senderId:string,receiverId:string):Promise<any>;
}