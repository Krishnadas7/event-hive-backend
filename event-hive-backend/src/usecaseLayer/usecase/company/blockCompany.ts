import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { IResponse } from "../../interface/services/Iresponse";

export const blockCompany = async (
    companyRepository:ICompanyRepository,
    companyId:string,
    
):Promise<IResponse> =>{
    try {
        const blocked = await companyRepository.blockCompany(companyId)
        if(blocked){
            return {
                status:200,
                success:true,
                message:'company blocked successfully'
            }
        }
        return {
            status:400,
            success:false,
            message:'company blocked failed'
        }
       
    } catch (error) {
        throw error
    }
}