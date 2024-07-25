import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import Ijwt from "../../interface/services/Ijwt";
import jwt from 'jsonwebtoken'
import CompanyModel from "../../../infrastructureLayer/database/model/companyModel";

export const companyRefreshToken = async (
    companyRepository:ICompanyRepository,
    Jwt:Ijwt,
    incomingRefreshToken:string
)=>{
  try {
    const accessTokenKey : any = process.env.ACCESS_TOKEN_KEY
      const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
      if (!incomingRefreshToken) {
        console.log('from error incoming refreshtoken');
        return {
            status:401,
            success:false,
            message:'token is not valid'
        }
    }
    const decoded:any = jwt.verify(incomingRefreshToken, refreshTokenKey)
    const user=await CompanyModel.findOne({_id:decoded.id})
    if(!user){
        return {
            status:401,
            success:false,
            message:'token is not valid'
        }
    }
    const {accessToken,refreshToken} = await Jwt.createJWT(user._id as string,user.company_email as string,"company",user.company_name as string)
    let obj={
        accessToken:accessToken,
        refreshToken:refreshToken
    }
    return {
        status:200,
        success:true,
        data:obj,
        message:'tokens'
    }
  } catch (error) {
    throw error
  }
}