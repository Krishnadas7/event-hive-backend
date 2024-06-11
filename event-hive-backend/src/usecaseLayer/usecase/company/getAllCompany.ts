import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { Is3bucket } from '../../interface/services/Is3Services';
import { S3Client } from "@aws-sdk/client-s3";

export const getAllCompany = async (
    companyRepository:ICompanyRepository,
    s3service:Is3bucket,
    s3:S3Client
) =>{
    try {
        const companies = await companyRepository.getAllCompany()
        const urlPromises = companies.map(async (company: any) => {
            console.log('user profile image', company.company_logo);
            try {
                const companyId = company._id.toString()
                const url = await s3service.getImages(s3, companyId as string);
                company.company_logo = url;
            } catch (err) {
                console.error(`Failed to get pre-signed URL for image ${company.profileImage}:`, err);
                company.company_logo = null; // Or handle it appropriately based on your requirements
            }
        });
        await Promise.all(urlPromises);
        return {
            status:200,
            success:true,
            message:'all company details',
            data:companies
        }
    } catch (error) {
        
    }
}