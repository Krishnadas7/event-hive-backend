import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import IHashPassword from "../../interface/services/IhashPassword";
import { IResponse,StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRequestValidator } from "../../interface/repository/IvalidareRepository";


export const googleAuth = async (
    requestValidator:IRequestValidator,
    userRepository:IUserRepository,
    bcrypt:IHashPassword,
    jwt:Ijwt,
    first_name:string,
    email:string,
    password:string
):Promise<IResponse> =>{
    try {
        // const validation = requestValidator.validateRequiredFields({email,password},["email","password"])
  
        // if(!validation.success){
        //  throw ErrorResponse.badRequest(validation.message as string)
        // }
 
         const user: IUser | null = await userRepository.findUser(email)
         if(!user){
            const hashedPassword = await bcrypt.createHash(password)
            const newUser ={
                first_name,
                email,
                password:hashedPassword
               }
            const creatingNewUser  = await userRepository.createUser(newUser)
            
           const { accessToken, refreshToken }:any =await jwt.createJWT(creatingNewUser._id, creatingNewUser.email, "user",creatingNewUser.first_name as string);
           const responseData: StoreData = {
            _id: creatingNewUser._id,
            name: creatingNewUser.first_name,
            email: creatingNewUser.email as string
        }
           return {
            status: 200,
            success: true,
            userAccessToken: accessToken,
            userRefreshToken: refreshToken,
            data: responseData,
            message: `Login successful, welcome ${creatingNewUser.first_name}`
        }
         }
         if (user && user._id) {
             if (user.is_block) {
                 throw ErrorResponse.badRequest('your account is blocked')
             }
             const { accessToken, refreshToken }:any =await jwt.createJWT(user._id, user.email as string, "user", user.first_name as string);
             user.refreshToken=refreshToken
             const responseData: StoreData = {
                 _id: user._id,
                 name: user.first_name,
                 email: user.email as string
             }
 
             return {
                 status: 200,
                 success: true,
                 userAccessToken: accessToken,
                 userRefreshToken: refreshToken,
                 data: responseData,
                 message: `Login successful, welcome ${user.first_name}`
             }
         }
         throw ErrorResponse.badRequest('wrong password or email');
     } catch (error) {
         throw error;
     }
}