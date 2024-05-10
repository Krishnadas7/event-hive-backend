import { IResponse } from "../../interface/services/Iresponse"
import { IUserRepository } from "../../interface/repository/IuserRepository"
import IHashPassword from "../../interface/services/IhashPassword"
// import Ijwt from "../../interface/services/Ijwt"
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
    console.log('usecase in user layer');
   //  if(password !== confirm_password)
   //  {
   //    return {
   //       status:200,
   //       success:false,
   //       message:'password and confirm password not match'}
   //  }
   console.log(password,confirm_password);
   
   const user = await userRepository.findUser(email)
   if(!user){
     const hashedPassword = await bcrypt.createHash(password)
     console.log(hashedPassword);
     
     const newUser = {
        first_name,
        last_name,
        email,
        is_verified:true,
        mobile,
        password:hashedPassword,
     }
     const createnewUser = await userRepository.createUser(newUser)
     
   //   const token = jwt.createJWT(createnewUser._id as string, createnewUser.email,'user',createnewUser.name)
   //   console.log(token)
      return {
        status : 200,
        success : true,
        message : `successfully registred welcome new user ${createnewUser.name}`,
      //   token : token,
        data:createnewUser
      }

   }
   throw ErrorResponse.badRequest('user already exists')
   } catch (error) {
    throw error
   }
}