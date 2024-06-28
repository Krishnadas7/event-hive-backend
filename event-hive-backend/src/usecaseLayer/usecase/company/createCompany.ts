import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRedis } from "../../interface/services/Iredis";
// const { createClient } = require('redis');
import { disconnectFromRedis } from "../../../infrastructureLayer/config/redis";
// const redisClient = createClient();

export const createCompany = async (
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    redis:IRedis,
    otp:string
):Promise<ICResponse> =>{
   try {
     const dataFromRedis = await redis.getStoredData('companyData')
     console.log('data from cerate company   ',dataFromRedis)
     console.log(dataFromRedis.otp)
     console.log(otp,dataFromRedis.otp)
     if(otp !=dataFromRedis.otp){
      console.log('data from cerate company   jkhkjlkj')
          return {
      status: 400,
      success: false,
      message: 'Enter proper otp'
     };
     }
     const companyDetails = await companyRepository.findCompany(dataFromRedis.company_email as string)
     console.log('checking company',companyDetails)
     if(companyDetails){
      ErrorResponse.badRequest('company already registerd')
     }
    //  if(!companyDetails){
    //     const hashedPassword = await bcrypt.createHash(password)
       const company={
        company_name:dataFromRedis.company_name,
        company_email:dataFromRedis.company_email,
        company_website:dataFromRedis.company_website,
        company_address:dataFromRedis.company_address,
        industry_type:dataFromRedis.industry_type,
        company_description:dataFromRedis.company_description,
        password:dataFromRedis.password
       }
       const newCompany = await companyRepository.createCompany(company)
       if(newCompany){
        await disconnectFromRedis()
       }
      
       return {
        status:200,
        success:true,
        message:`company created successfully ${dataFromRedis.company_name}`,
        data:newCompany
       }
   } catch (error) {
     throw error
   }
}