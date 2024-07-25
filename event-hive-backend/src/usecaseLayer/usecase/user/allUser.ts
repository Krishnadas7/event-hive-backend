import ErrorResponse from "../../handler/errorResponse"
import { IUserRepository } from "../../interface/repository/IuserRepository"

export const allUsers = async (
    userRepository:IUserRepository
)=>{
    try {
        const users = await userRepository.allUsers()
        if(users){
            return {
               status:200,
               success:true,
               message:'all users',
               data:users
            }
        }
       throw ErrorResponse.badRequest('wront in all users')
    } catch (error) {
        throw error
    }
}