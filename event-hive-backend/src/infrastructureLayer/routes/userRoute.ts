
import express,{NextFunction,Request,Response} from 'express'
import Ijwt from '../../usecaseLayer/interface/services/Ijwt';
import { userAdapter } from './injections/userInjection'
import UserModel from '../database/model/userModel';
// import ErrorResponse from '../../usecaseLayer/handler/errorResponse';
import jwt from 'jsonwebtoken';
const refreshTokens:any = [];
const router = express.Router()
import AuthMiddleware from '../Middleware/authMiddleware';
import { IUser } from '../../domainLayer/user';

router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
userAdapter.createUser(req,res,next)
})

router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.loginUser(req,res,next)
})
router.post('/oauth',(req:Request,res:Response,next:NextFunction)=>{
  userAdapter.googleAuth(req,res,next)
})

router.post('/sendotp-forgotpassword',(req:Request,res:Response,next:NextFunction)=>{
    userAdapter.sendOtpForgotPassword(req,res,next)
})
router.post(
    "/forgot-password",
    (req: Request, res: Response, next: NextFunction) =>
      userAdapter.fogotPassword(req, res, next)
  );

  router.post("/sendEmail", (req: Request, res: Response, next: NextFunction) =>
    userAdapter.sendEmail(req, res, next)
  );

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
        maxAge: 120000
       })
       .cookie("userRefreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
       })
       .json({accessToken,refreshToken });
  
   } catch (error) {
    res.status(401)
   }
    
});
router.get('/profile',AuthMiddleware.protectUser,(req: Request, res: Response, next: NextFunction)=>{

  console.log('profileee');
  
  return res.json({status:200,success:true,message:'this is user profile'})
})
export default router