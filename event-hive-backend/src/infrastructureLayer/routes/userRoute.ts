
import express,{NextFunction,Request,Response} from 'express'
import Ijwt from '../../usecaseLayer/interface/services/Ijwt';
import { userAdapter } from './injections/userInjection'
import { eventAdapter } from './injections/eventInjections';
import UserModel from '../database/model/userModel';
// import ErrorResponse from '../../usecaseLayer/handler/errorResponse';
import { S3Client ,S3ClientConfig,PutObjectCommand} from '@aws-sdk/client-s3';
import {upload} from '../Middleware/multer'
import path from 'path'
import dotenv from 'dotenv'
// import '../../../../.env'
import jwt from 'jsonwebtoken';
const refreshTokens:any = [];
const router = express.Router()
import AuthMiddleware from '../Middleware/authMiddleware';
import { IUser } from '../../domainLayer/user';
import { bookingAdapter } from './injections/bookingInjection';
// import 'dotenv/config'
const envFilePath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envFilePath })

// ======
const bucketName = process.env.BUCKET_NAME
const bucketRegion = process.env.BUCKET_REGION 
const s3AccessKey = process.env.S3_ACCESS_KEY
const secretKey = process.env.SECRET_ACCESS_KEY

if (!bucketName || !bucketRegion || !s3AccessKey || !secretKey) {
  throw new Error('Missing required environment variables.');
}
const clientConfig:S3ClientConfig = {
  credentials: {
    accessKeyId: s3AccessKey,
    secretAccessKey: secretKey,
  },
  region: bucketRegion,
}

const s3  = new S3Client (clientConfig);
// klklwfelk

router.post('/signup',
(req:Request,res:Response,next:NextFunction)=>{
userAdapter.createUser(req,res,next)
})

router.post('/login',
(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.loginUser(req,res,next)
})
router.post('/oauth',
(req:Request,res:Response,next:NextFunction)=>{
  userAdapter.googleAuth(req,res,next)
})

router.post('/sendemailfor-forgot',
(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.sendEmailForgotPassword(req,res,next)
})
router.post(
    "/forgot-password",
    (req: Request, res: Response, next: NextFunction) =>
      userAdapter.fogotPassword(req, res, next)
  );

  router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sendEmail(req, res, next)
  );
  router.post('/profile-image-update',upload.single('image'),async (req:Request,res:Response,next:NextFunction)=>{
    console.log('body',req.file,req.body)
  //   const params = {
  //     Bucket: bucketName,
  //     Key: req.file?.originalname,
  //     Body: req.file?.buffer,
  //     ContentType: req.file?.mimetype,
  // };
  // const command = new PutObjectCommand(params);
  // await s3.send(command);
  // console.log("upload success...");
  userAdapter.profileImageUpdate(req,res,next)
  })

  router.post("/verifyEmail", (req: Request, res: Response, next: NextFunction) =>
    userAdapter.emailVerification(req, res, next)
  );
  router.post('/refresh-token',async (req, res, next) => {
    console.log('refresh token root');
    
    const incomingRefreshToken =  req.body.refreshToken
    const accessTokenKey : any = process.env.ACCESS_TOKEN_KEY
      const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
  
    console.log('from refresh tokennnnn=====',incomingRefreshToken);
    
    if (!incomingRefreshToken) {
      console.log('from error incoming refreshtoken');
      
      return res.status(401).json({message:"refresh token is not there"})
  }

  //  const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
  //  console.log('r==',refreshToken);
   try {
    const decoded:any = jwt.verify(incomingRefreshToken, refreshTokenKey)
      
      const user:IUser|null=await UserModel.findOne({_id:decoded.id})
      
      if(!user){
        return res.status(401)
      }
      // if(incomingRefreshToken!== user.refreshToken){
      //   return res.status(410)
      // }
      // Generate a new access token
      

      // const {accessToken,refreshToken} = 

      const accessToken = jwt.sign({ id: decoded.id, email: decoded.email,role:'user',name:decoded.first_name }, accessTokenKey, { expiresIn: '2m' });
      const refreshToken = jwt.sign({id: decoded.id},refreshTokenKey,{expiresIn:'30d'})
      console.log('accesstoken from refrshroutn',accessToken);
      console.log('refrrr',refreshToken);
      
      
       res.status(200)
       .cookie("userAccessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 900000
       })
       .cookie("userRefreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
       })
       .json({accessToken,refreshToken });
  
   } catch (error) {
    console.log('=======jsdhsd',error);
    
    res.status(401)
   }
    
});
router.post('/reset-password',(req: Request, res: Response, next: NextFunction)=>{
  // console.log(req.body)
  userAdapter.resetPassword(req,res,next)
})
router.post('/token-validation',(req: Request,res: Response, next: NextFunction)=>{
  userAdapter.tokenValidation(req,res,next)
})


router.get('/profile',AuthMiddleware.protectUser,(req: Request, res: Response, next: NextFunction)=>{

  console.log('profileee');
  
  return res.json({status:200,success:true,message:'this is user profile'})
})
router.post('/profile-update',AuthMiddleware.protectUser,(req: Request, res: Response, next: NextFunction)=>{
   console.log('update profile route ',req.body)
userAdapter.profileUpdate(req,res,next)
}
)
router.get('/user-data',AuthMiddleware.protectUser,(req: Request,res: Response,next: NextFunction)=>
  userAdapter.userData(req,res,next)
)
router.get('/random-user-data',AuthMiddleware.protectUser,(req: Request,res: Response,next: NextFunction)=>{
  userAdapter.getRandomUser(req,res,next)
})
router.get('/get-image',AuthMiddleware.protectUser,(req: Request,res: Response,next: NextFunction)=>{
 userAdapter.getImage(req,res,next)
})

router.get('/all-user',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
   const users:any = await UserModel.find({is_block:false})
   console.log('usersf from chat',users)
   res.status(200).json({
    success:true,
    message:'all users',
    data:users
   })
})
router.get('/event-for-users',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.userEventList(req,res,next)
})
router.get('/selected-event',AuthMiddleware.protectUser,async(req: Request, res: Response,next: NextFunction)=>{
  console.log('qurry id',req.query.eventId)
  eventAdapter.selectedEvent(req,res,next)
})
router.get('/search-event',async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.searchEvent(req,res,next)
})
router.get('/filter-events',async(req: Request, res: Response,next: NextFunction)=>{
  eventAdapter.filterEvents(req,res,next)
})
router.post('/ticket-booking',async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.ticketBooking(req,res,next)
})
router.post('/weebhook',async(req: Request,res : Response,next: NextFunction)=>{
   console.log('webhook route is called')
  bookingAdapter.webhook(req,res,next)
})
router.get('/all-bookings',async(req: Request,res : Response,next: NextFunction)=>{
  console.log('all bookin',req.query.userId)
  bookingAdapter.allBookings(req,res,next)
})
router.get('/member-exist',async(req: Request,res : Response,next: NextFunction)=>{
  userAdapter.memberexist(req,res,next)
})
router.get('/live-checking',async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.liveChecking(req,res,next)
})
router.get('/live-listing',async(req: Request,res : Response,next: NextFunction)=>{
  bookingAdapter.liveListing(req,res,next)
})
export default router