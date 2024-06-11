import exprss,{Request,Response,NextFunction} from 'express'
import { adminAdapter } from './injections/adminInjection'
import { eventAdapter } from './injections/eventInjections';
import { companyAdapter } from './injections/companyInjection';
import  jwt  from 'jsonwebtoken';
import AdminModel from '../database/model/adminModel';
import {IAdmin} from '../../domainLayer/admin'
import AuthMiddleware from '../Middleware/authMiddleware';

const router = exprss.Router();

router.post('/admin-login',(req:Request,res:Response,next: NextFunction) =>{
        console.log('route from login admin')
        
        adminAdapter.loginAdmin(req,res,next)
}
)
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
      
      const user:IAdmin|null=await AdminModel.findOne({_id:decoded.id})
      if(!user){
        return res.status(401)
      }
      const accessToken = jwt.sign({ id: decoded.id, email: decoded.email,role:'admin',name:decoded.name }, accessTokenKey, { expiresIn: '15m' });
      const refreshToken = jwt.sign({id: decoded.id},refreshTokenKey,{expiresIn:'30d'})
       res.status(200)
       .cookie("adminAccessToken",accessToken,{
        httpOnly:true,
        secure:true,
        sameSite:'strict',
        maxAge: 900000 
       })
       .cookie("adminRefreshToken",refreshToken,{
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

router.get('/get-user',AuthMiddleware.protectAdmin,(req:Request,res:Response,next:NextFunction) =>{
    console.log('get user routert')
    adminAdapter.getUsers(req,res,next)
}
      
)

router.patch('/user/block-unblock',AuthMiddleware.protectAdmin,
(req:Request,res:Response,next:NextFunction) =>
    adminAdapter.blockUnblock(req,res,next)
)
router.get('/get-events-with-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  eventAdapter.eventWithCompany(req,res,next)
})
router.patch('/event-block',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  eventAdapter.blockEvent(req,res,next)
})
router.get('/all-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  companyAdapter.getAllCompany(req,res,next)
})
router.patch('/block-company',AuthMiddleware.protectAdmin,(req: Request,res: Response, next: NextFunction) =>{
  companyAdapter.blockCompany(req,res,next)
})
export default router