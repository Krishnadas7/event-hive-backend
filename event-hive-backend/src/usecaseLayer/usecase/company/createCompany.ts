import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import { IRedis } from "../../interface/services/Iredis";
import { redisClient } from "../../../infrastructureLayer/config/redis";
import { ICompany } from "../../../domainLayer/company";
import { StatusCodes } from "../../../utils/statusCodes"

export const createCompany = async (
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    redis:IRedis,
    otp:string
):Promise<ICResponse> =>{
   try {
     const dataFromRedis: string | null = await redisClient.get('companyData')
     const datas: ICompany = dataFromRedis ? JSON.parse(dataFromRedis) : {};
     if(otp !=datas.otp){
          throw ErrorResponse.badRequest('invalid otp')
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
       return {
        status:StatusCodes.OK,
        success:true,
        message:`company created successfully ${datas.company_name}`,
        data:newCompany
       }
   } catch (error) {
     throw error
   }
}