import exprss,{Request,Response,NextFunction} from 'express'
import { adminAdapter } from './injections/adminInjection'

const router = exprss.Router();

router.post('/admin-login',
    (req:Request,res:Response,next: NextFunction) =>
        adminAdapter.loginAdmin(req,res,next)
)

router.get('/get-user',
    (req:Request,res:Response,next:NextFunction) =>
        adminAdapter.getUsers(req,res,next)
)

router.patch('/user/block-unblock',
(req:Request,res:Response,next:NextFunction) =>
    adminAdapter.blockUnblock(req,res,next)
)

export default router