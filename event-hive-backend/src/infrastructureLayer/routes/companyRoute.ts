import express,{NextFunction,Request,Response} from 'express'
import { companyAdapter } from './injections/companyInjection'
import { eventAdapter } from './injections/eventInjections'
import { ICompany } from '../../domainLayer/company'
import CompanyModel from '../database/model/companyModel'
import jwt from 'jsonwebtoken'
import AuthMiddleware from '../Middleware/authMiddleware'
import { upload } from '../Middleware/multer'
const router = express.Router()

router.post('/signup',(req:Request,res:Response,next:NextFunction)=>{
    companyAdapter.createCompany(req,res,next)
})
router.post('/login',(req:Request,res:Response,next:NextFunction)=>{
    companyAdapter.companyLogin(req,res,next)
})
router.post('/send-email',(req:Request,res:Response,next:NextFunction)=>{
    console.log(req.body)
    companyAdapter.sendEmailforCompany(req,res,next)
})
router.get('/get-company-profile',AuthMiddleware.protectCompany,(req: Request,res : Response, next: NextFunction) =>{
   companyAdapter.getCompanyProfile(req,res,next)
})
// In the backend (Express route)
router.post('/company-profile-edit',AuthMiddleware.protectCompany,upload.single('company_logo'),(req: Request, res: Response, next: NextFunction) => {
  console.log('body from edit profile', req.cookies.companyAccessToken);
  console.log('====',req.body)
  companyAdapter.companyProfileUpdate(req,res,next)
});
router.post('/event-creation',AuthMiddleware.protectCompany,upload.single('event_poster'),(req: Request,res: Response,next: NextFunction)=>{
  eventAdapter.createEvent(req,res,next)
})
router.get('/get-all-company',(req:Request,res:Response,next:NextFunction) =>{
  eventAdapter.getCompany(req,res,next)
})

router.post('/refresh-token',async (req:Request,res:Response,next: NextFunction) =>{ 
    const incomingRefreshToken =  req.body.refreshToken
    const accessTokenKey : any = process.env.ACCESS_TOKEN_KEY
      const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
    if (!incomingRefreshToken) {
      console.log('from error incoming refreshtoken');
      return res.status(401).json({message:"refresh token is not there"})
  }
   try {
    const decoded:any = jwt.verify(incomingRefreshToken, refreshTokenKey)
      
      const user:ICompany|null=await CompanyModel.findOne({_id:decoded.id})
      if(!user){
        console.log('company',user)
        return res.status(401)
      }
      const accessToken = jwt.sign({ id: decoded.id, email: decoded.email,role:'company',name:decoded.name }, accessTokenKey, { expiresIn: '2m' });
      const refreshToken = jwt.sign({id: decoded.id},refreshTokenKey,{expiresIn:'30d'})
       res.status(200)
       .cookie("companyAccessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 900000 
       })
       .cookie("companyRefreshToken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
       })
       .json({accessToken,refreshToken });
  
   } catch (error) {
    res.status(401)
   }
})

export default router