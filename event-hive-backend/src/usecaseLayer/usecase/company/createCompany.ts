import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRedis } from "../../interface/services/Iredis";
import { redisClient } from "../../../infrastructureLayer/config/redis";
export const createCompany = async (
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    redis:IRedis,
    otp:string
):Promise<ICResponse> =>{
   try {
     const dataFromRedis = await redisClient.get('companyData')
     let datas:any = JSON.parse(dataFromRedis as any)
     if(otp !=datas.otp){
          return {
      status: 200,
      success: false,
      message: 'Invalid otp'
     };
     }
     const companyDetails = await companyRepository.findCompany(datas.company_email as string)
     console.log('checking company',companyDetails)
     if(companyDetails){
      throw ErrorResponse.badRequest('company already registerd')
     }
     
       const company={
        company_name:datas.company_name,
        company_email:datas.company_email,
        company_website:datas.company_website,
        company_address:datas.company_address,
        industry_type:datas.industry_type,
        company_description:datas.company_description,
        password:datas.password
       }
       
       const newCompany = await companyRepository.createCompany(company)
       if(newCompany){
        // await disconnectFromRedis()
       }
      
       return {
        status:200,
        success:true,
        message:`company created successfully ${datas.company_name}`,
        data:newCompany
       }
   } catch (error) {
    console.log('error from create company')
     throw error
   }
}