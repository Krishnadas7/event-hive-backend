import { IResponse } from "../../interface/services/Iresponse";
import {IUser} from '../../../domainLayer/user'
import { IUserRepository } from "../../interface/repository/IuserRepository";
import { Is3bucket } from "../../interface/services/Is3Services";
import { S3Client } from "@aws-sdk/client-s3";
import ErrorResponse from "../../handler/errorResponse";
import { StoreData } from "../../interface/services/Iresponse";

export const profileImageUpdate = async (
  userRepository:IUserRepository,
  s3service:Is3bucket,
  s3:S3Client,
  image:Express.Multer.File|undefined,
  id:string,
  email:string
):Promise<IResponse> =>{
    try {
      
      console.log('datas from profileimage upalodad  ',image,id)
        if(image){
          console.log('imageee',image)
        const nameReturn =await s3service.profileImageUpdate(s3,image,id)
         
         if(nameReturn){
           const user:any = await userRepository.findUser(email)
           console.log('userProfile imageee',user)
           const userId = user._id.toString()
           let url:string=''
           if(user.profileImage!==''){
            url =await s3service.getImages(s3,userId)
            
         }
         const responseData: StoreData = {
          _id: user._id,
          name: user.first_name,
          email: user.email as string,
          profileImg:url
        }
            const response = await userRepository.uploadProfileImage(nameReturn,id)
            if(response){
              return {
                status:200,
                success:true,
                message:'profile updated',
                data:responseData
              }
            }else{
                throw ErrorResponse.badRequest('user doesn,t exist')
            }
         }else{
            throw ErrorResponse.internalError('servier error')
         }
        }else{
            throw ErrorResponse.internalError('no image')
        }
       
    } catch (error) {
        throw error
    }
    
    
}