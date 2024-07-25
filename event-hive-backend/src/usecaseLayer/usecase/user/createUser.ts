import { IResponse } from "../../interface/services/Iresponse"
import { IUserRepository } from "../../interface/repository/IuserRepository"
import IHashPassword from "../../interface/services/IhashPassword"
import ErrorResponse from "../../handler/errorResponse"


export const createUser =async (
    userRepository : IUserRepository,
    bcrypt : IHashPassword,
    first_name : string,
    last_name : string,
    email : string,
    password : string,
    confirm_password : string,
    mobile : string,
): Promise<IResponse> =>{
   try {
   const user = await userRepository.findUser(email)
   if(!user){
     const hashedPassword = await bcrypt.createHash(password)
     const newUser = {
        first_name,
        last_name,
        email,
        is_verified:true,
        mobile,
        profileImage:'',
        password:hashedPassword,
     }
     const createnewUser = await userRepository.createUser(newUser)
      return {
        status : 200,
        success : true,
        message : `successfully registred welcome new user ${createnewUser.name}`,
        data:createnewUser
      }

   }
   throw ErrorResponse.badRequest('user already exists')
   } catch (error) {
    throw error
   }
}