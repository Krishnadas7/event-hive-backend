import  jwt  from 'jsonwebtoken';
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { ICResponse } from "../../interface/services/Iresponse";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";

export const companyProfileUpdate = async (
        companyRepository:ICompanyRepository,
        s3service:Is3bucket,
        s3:S3Client,
        company_name: string,
        company_email: string,
        company_address: string,
        state: string,
        postal_code: string,
        country: string,
        company_website: string,
        locality: string,
        company_description: string,
        contact_personname: string,
        contact_personphone: string,
        industry_type: string,
        companyLogo:Express.Multer.File,
        token:string,
):Promise<ICResponse>=>{
    try {
    const decoded:any = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string)
    const imageUpload = await s3service.profileImageUpdate(s3,companyLogo,decoded.id)
    if(imageUpload){
        const response = await companyRepository.updateCompanyImageName(imageUpload,decoded.id)
        console.log(response)
        const updateProfile = await companyRepository.updateProfile(
            company_name,
            company_email,
            company_address,
            state,
            postal_code,
            country,
            company_website,
            locality,
            company_description,
            contact_personname,
            contact_personphone,
            industry_type
        )
        return {
            status:200,
            success:true,
            message:'your profile was updated',
            data:updateProfile
        }
    }
    return {
        status: 400,
        success: false,
        message: 'Enter proper otp'
       };
    } catch (error) {
        throw error
    }    
}