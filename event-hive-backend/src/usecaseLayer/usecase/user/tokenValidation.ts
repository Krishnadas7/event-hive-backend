import ErrorResponse from "../../handler/errorResponse";
import { IUserRepository } from "../../interface/repository/IuserRepository";

import { IResponse } from "../../interface/services/Iresponse";
import jwt from 'jsonwebtoken'

export const tokenValidation = async (
forgotToken:string
): Promise<IResponse> =>{
    try {
        console.log('sdsdlksdklsdlk===',forgotToken)
        let valid = jwt.verify(forgotToken,process.env.FORGOT_TOKEN||'')
            if(!valid){
                return {
                    status:401,
                    success:false,
                    message:'token is expired'
                }
            }
        return {
            status:200,
            success:true,
            message:'token is there'
        }
    } catch (error) {
        throw error
    }
}