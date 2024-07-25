import { IUnreadRepository } from "../../interface/repository/IunreadRepository"
import jwt from 'jsonwebtoken'
import ErrorResponse from "../../handler/errorResponse"

export const getNotification = async (
    unreadRepository:IUnreadRepository,
    token:string
) =>{
 try {
    const decoded:any =await  jwt.verify(token,'refreshtokenkey123',(err,res)=>{
        if(err){
            throw ErrorResponse.badRequest('token not verified')
        }
        return res
    })
    const notifications = await unreadRepository.getUserNotifications(decoded.id)
    return {
        status:200,
        success:true,
        message:'notification',
        data:notifications
    }
 } catch (error) {
    throw error
 }
}