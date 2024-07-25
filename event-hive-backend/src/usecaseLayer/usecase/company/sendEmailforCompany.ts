import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { IRedis } from '../../interface/services/Iredis';
import INodemailer from '../../interface/services/Inodemailer';
import { ICResponse } from '../../interface/services/Iresponse';
import {redisClient}  from "../../../infrastructureLayer/config/redis";


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
           return {
            status:200,
            success:false,
            message:'email already exists'
           }
        }
        if(!companyData){
        const sendEmailOtp = await nodemailer.sendEmailForCompanyRegistration(company_email,company_name)
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

        console.log(dataStoring,'data storing')
        const dataFromRedis = await redisClient.get('companyData')
     let datas:any = JSON.parse(dataFromRedis as any)
     console.log('redis data',datas)
        return {
            status:200,
            success:true
        }
    }
    throw ErrorResponse.badRequest('something went wrong')
    } catch (error) {
        console.log('error from company sendemail usecase',error)
        throw error
    }
   

    

}