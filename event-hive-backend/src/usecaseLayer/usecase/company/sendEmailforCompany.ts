import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { IRedis } from '../../interface/services/Iredis';
import INodemailer from '../../interface/services/Inodemailer';
import { ICResponse } from '../../interface/services/Iresponse';
import {redisClient}  from "../../../infrastructureLayer/config/redis";
import { StatusCodes } from "../../../utils/statusCodes"

export const sendEmailforCompany = async (
    CompanyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    nodemailer:INodemailer,
    redis:IRedis,
    company_name:string,
    company_email:string,
    password:string,
    company_website:string,
    company_address:string,
    industry_type:string,
    company_description:string,
):Promise<ICResponse> =>{
    try {
        // await connectToRedis()
        const companyData = await CompanyRepository.findCompany(company_email)
        console.log(companyData)
        if(companyData){
           throw ErrorResponse.badRequest('email already exists')
        }
        
        const sendEmailOtp = await nodemailer.sendEmailForCompanyRegistration(company_email,company_name)
        console.log(sendEmailOtp,'bakckd snd mail')
        const hashedPassword = await bcrypt.createHash(password)
        let obj={
            company_name,
            company_email,
            company_website,
            company_address,
            industry_type,
            company_description,
            password:hashedPassword,
            otp:sendEmailOtp
        }
        const dataStoring = await redisClient.set('companyData', JSON.stringify({...obj}), 'EX', 300);
        return {
            status:StatusCodes.OK,
            success:true,
            message:'check your email'
        }
    
    } catch (error) {
        throw error
    }
   

    

}