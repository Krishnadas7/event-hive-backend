import { ICompany } from "../../../../domainLayer/company";
import CompanyModel from "../../model/companyModel";
import { CompanyData } from "../../../../usecaseLayer/interface/services/Iresponse";

export const createCompany = async (
    company: ICompany,
    companyModel:typeof CompanyModel
) : Promise<CompanyData> =>{
    try {
        const companyD = await companyModel.create(company)
        await companyD.save()
        const responseData : CompanyData = {
             _id:company._id,
             company_email:company.company_email,
             company_name:company.company_name
        }
        return responseData 
    } catch (error) { 
        throw error
    }
}