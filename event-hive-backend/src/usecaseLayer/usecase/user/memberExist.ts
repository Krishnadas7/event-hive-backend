import ErrorResponse from '../../handler/errorResponse';
import { IResponse } from '../../interface/services/Iresponse';
import { IUserRepository } from './../../interface/repository/IuserRepository';

export const memberExist = async (
    userRepository:IUserRepository,
    userId:string,
    email:string,
):Promise<IResponse> =>{
    try {
        const member = await userRepository.memberExist(userId,email)
        if(member || !member){
            return{
                success:true,
                status:200,
                message:'already inserted',
                data:member
            }
        }
        throw ErrorResponse.badRequest('something went wrong')
    } catch (error) {
        throw error
    }
}