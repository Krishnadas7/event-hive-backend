import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import { IRedis } from '../../interface/services/Iredis';
import INodemailer from '../../interface/services/Inodemailer';
import { ICResponse } from '../../interface/services/Iresponse';
// import { createClient } from 'redis';
// export const redisClient = createClient();
// redisClient.on('error', (err) => console.error('Redis Client Error', err));
// redisClient.connect().catch(console.error);
import { connectToRedis } from "../../../infrastructureLayer/config/redis";


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
        await connectToRedis()
        const companyData = await CompanyRepository.findCompany(company_email)
        console.log('companyData',companyData)
        if(!companyData){
          console.log('name and email',company_email,company_name)
        const sendEmailOtp = await nodemailer.sendEmailForCompanyRegistration(company_email,company_name)
        console.log('otp from sendemailfor compay',sendEmailOtp)
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
        const dataStoring = await redis.dataStoringRedis(obj)
        return {
            status:200,
            success:true
        }
    }
    throw ErrorResponse.badRequest('user already exists')
    } catch (error) {
        throw error
    }
   

    

}