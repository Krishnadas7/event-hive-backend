import UnreadModel from "../../model/unreadModel";

export const getUserNotifications = async (
    userId: string,
    notificationModel: typeof UnreadModel
) => {
    const notifications = await notificationModel.findOne({ user: userId });
    
    return notifications;
}