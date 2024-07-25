import { IUserRepository } from '../../interface/repository/IuserRepository'
import IHashPassword from '../../interface/services/IhashPassword'
import { IResponse } from '../../interface/services/Iresponse'
import jwt from 'jsonwebtoken'

export const resetPassword = async (
    userRepository:IUserRepository,
    bcrypt:IHashPassword,
    password:string,
    forgotToken:string
):Promise<IResponse> =>{
    try {
        console.log('from res',forgotToken)
        console.log(process.env.FORGOT_TOKEN);
        
        const decoded: any = jwt.verify(forgotToken, process.env.FORGOT_TOKEN || '');
         console.log('decode error',decoded)
        const resetP =await userRepository.findUser(decoded.email)
        const newPassword =await bcrypt.createHash(password)
        const updatePassword =await userRepository.updatePassword(newPassword,decoded.email)
        
        return {
            status:200,
            success:true,
            message:'password updated'
        }
    } catch (error) {
        throw error
    }
}