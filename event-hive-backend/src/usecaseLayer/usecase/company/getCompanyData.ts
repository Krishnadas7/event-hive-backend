import { ICompanyRepository } from "../../interface/repository/IcompanyRepository";
import { ICResponse } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";
import jwt from 'jsonwebtoken'

export const getcompanyData = async (
    companyRepository:ICompanyRepository,
    token:string
) =>{
    try {
        const decoded:any = await jwt.verify(token,process.env.ACCESS_TOKEN_KEY as string)
        const companyData = await companyRepository.findCompanyWithId(decoded.id as string)
              return {
                status:200,
                success:true,
                message:'company prfile data',
                data:companyData
              }
    } catch (error) {
        throw(error)
    }
    

   
}