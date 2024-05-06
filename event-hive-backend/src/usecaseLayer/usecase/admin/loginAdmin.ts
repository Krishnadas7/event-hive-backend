import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../interface/repository/IadminRepository";
import IHashPassword from "../../interface/services/IhashPassword";
import Ijwt from "../../interface/services/Ijwt";
import { IResponse ,StoreData } from "../../interface/services/Iresponse";
import ErrorResponse from "../../handler/errorResponse";

export const loginAdmin = async(
adminRepository:IAdminRepository,
bcrypt:IHashPassword,
jwt:Ijwt,
email:string,
password:string
): Promise<IResponse> => {
 try {
    const admin : IAdmin | null = await adminRepository.findAdmin(email)

    if(admin && admin._id){
      const match : boolean = await bcrypt.compare(password,admin.password)
      if(match){
       const token = jwt.createJWT(
        admin._id,
        admin.email,
        "admin",
        admin.name
       )

       const responseData : StoreData ={
        _id:admin._id,
        name:admin.name,
        email:admin.email
       }
       return {
        status:200,
        success:true,
        data:responseData,
      //   token:token,
        message:`login successfully welcome ${admin.name}`
       }
      }
      throw ErrorResponse.badRequest("wrong password or email")
    }
    throw ErrorResponse.badRequest("wrong password or email")
 } catch (error) {
    throw error
 }
}