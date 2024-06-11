import { PutObjectCommand,S3Client,GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Is3bucket } from "../../usecaseLayer/interface/services/Is3Services";
import path from 'path'
import dotenv from 'dotenv'
// import '../../../../.env'
const envFilePath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envFilePath })

export class S3services implements Is3bucket{
   async profileImageUpdate(s3Obj: S3Client, file: Express.Multer.File,name:string){
    const bucketName = process.env.BUCKET_NAME;
    
    console.log('bucket namee ',bucketName,name)
   console.log('keytyy',file);
   if (!file || !file.buffer || !file.mimetype) {
    throw new Error("Invalid file properties. Ensure file, buffer, and mimetype are properly set.");
}
   const params = {
    Bucket: bucketName,
    Key:name,
    Body: file.buffer,
    ContentType: file.mimetype,
};


    const command = new PutObjectCommand(params);
    
    try {

        await s3Obj.send(command);
        console.log("upload success...");
        
        return name; 

    } catch (error) {
        throw error
        console.error("Error uploading file to S3:", error);
        // throw new Error("Failed to upload file to S3");

    }    
   }
   async getImages(s3Obj: S3Client, key: string): Promise<string> {
    const bucketName = process.env.BUCKET_NAME;
    
    const params = {
        Bucket: bucketName,
        Key: key,
    };
    
    const command = new GetObjectCommand(params);
   console.log('dsfdssdfdsds',bucketName)
    try {

        const url = await getSignedUrl(s3Obj as any, command as any, { expiresIn: 3600 });
        console.log('url from getimages=========',url);
        
        return url;

    } catch (error) {
        console.error("Error getting pre-signed URL:", error);
        throw error
        // throw new Error("Failed to get pre-signed URL for image");
    }
}
   
}



