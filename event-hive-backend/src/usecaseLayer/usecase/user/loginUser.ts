import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import IHashPassword from "../../interface/services/IhashPassword";
import { IResponse, StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
// import  IRequestValidatior  from "../../interface/repository/IvalidareRepository";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";

export const loginUser = async (
    requestValidator:IRequestValidator,
    userRepository: IUserRepository,
    bcrypt: IHashPassword,
    jwt: Ijwt,
    email: string,
    password: string
): Promise<IResponse> => {
    try {
       const validation = requestValidator.validateRequiredFields({email,password},["email","password"])
 
       if(!validation.success){
        throw ErrorResponse.badRequest(validation.message as string)
       }

        const user: IUser | null = await userRepository.findUser(email)
        
        if (user && user._id) {
            if (user.is_block) {
                throw ErrorResponse.badRequest('your account is blocked')
            }
            const match:boolean = await bcrypt.compare(password,user.password)
            if(match){

            
            
            const { accessToken, refreshToken }:any =await jwt.createJWT(user._id, user.email, "user", user.first_name);
            user.refreshToken=refreshToken
            const responseData: StoreData = {
                _id: user._id,
                name: user.first_name,
                email: user.email
            }

            return {
                status: 200,
                success: true,
                accessToken: accessToken,
                refreshToken: refreshToken,
                data: responseData,
                message: `Login successful, welcome ${user.first_name}`
            }
        }
        throw ErrorResponse.badRequest('wrong password or email');
        }
        throw ErrorResponse.badRequest('wrong password or email');
    } catch (error) {
        throw error;
    }
}
