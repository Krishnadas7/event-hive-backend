import UserModel from "../../../infrastructureLayer/database/model/userModel";
import { IUserRepository } from "../../interface/repository/IuserRepository";
import Ijwt from "../../interface/services/Ijwt";
import jwt from 'jsonwebtoken'

export const userRefreshToken = async (
    userRepository:IUserRepository,
    Jwt:Ijwt,
    incomingRefreshToken:string
)=>{
try {
    const accessTokenKey : any = process.env.ACCESS_TOKEN_KEY
    const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
    if (!incomingRefreshToken) {
        return {
            status:401,
            success:false,
            message:'access token is not available'
        }
    }
    const decoded:any = jwt.verify(incomingRefreshToken, refreshTokenKey)
    const user = await UserModel.findOne({_id:decoded.id})
    if(!user){
        return {
            status:401,
            success:false,
            message:'user is not defined'
        }
      }
      const { accessToken, refreshToken }:any =await Jwt.createJWT(user._id, user.email as string, "user", user.first_name as string);
      let obj={
        accessToken:accessToken,
        refreshToken:refreshToken
      }
      return {
        status:200,
        success:false,
        data:obj,
        message:'refresh token'
      }
} catch (error) {
    throw error
}
}