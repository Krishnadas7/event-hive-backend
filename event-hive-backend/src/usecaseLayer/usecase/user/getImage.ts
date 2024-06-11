import { Is3bucket } from "../../interface/services/Is3Services"
import { S3Client } from "@aws-sdk/client-s3"
import { IUserRepository } from "../../interface/repository/IuserRepository"
const { ObjectId } = require('mongodb');

export const getImage = async(
    userRepository:IUserRepository,
    s3service:Is3bucket,
    s3:S3Client,
    email:string
)=>{
  try {
     const user:any = await userRepository.findUser(email)
     const userId = user._id.toString()
     console.log('useridddddd',userId)
     const url = await s3service.getImages(s3,userId as string)
     console.log('ulllll=====',url)
     return {
        status:200,
        success:true,
        message:'message is got',
        data:url
     }
  } catch (error) {
    throw error
  }
}