import ErrorResponse from "../../handler/errorResponse";
import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import Ijwt from "../../interface/services/Ijwt";
import { CompanyData } from "../../interface/services/Iresponse";

export const companyLogin = async (
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    jwt:Ijwt,
    company_email:string,
    password:string
) =>{
    try {
        console.log('from company login',company_email,password)
        const company = await companyRepository.findCompany(company_email)
        console.log('from company co',company)
        if(company){
            const match:boolean = await bcrypt.compare(password,company.password as string)
            console.log('from match',match)
            if(match){
                const {accessToken,refreshToken} = await jwt.createJWT(company._id as string,company.company_email as string,"company",company.company_name as string)
                const responseData : CompanyData={
                    _id:company._id,
                    company_email:company.company_email,
                    company_name:company.company_name
                }
                return{
                    status:200,
                    success:true,
                    companyAccessToken:accessToken,
                    companyRefreshToken:refreshToken,
                    data:responseData,
                    message:`login successfully,welcome company ${company.company_name}`
                }
            }
            throw ErrorResponse.badRequest("wrong password or email")
        }
        throw ErrorResponse.badRequest("wrong password or email")
    } catch (error) {
        throw error
    }
}