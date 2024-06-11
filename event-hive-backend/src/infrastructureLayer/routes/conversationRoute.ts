import exprss,{Request,Response,NextFunction} from 'express'
import { conversationAdapter } from './injections/conversationInjection'
import AuthMiddleware from '../Middleware/authMiddleware'
const router = exprss.Router()

router.post('/',(req: Request,res: Response,next: NextFunction)=>{
    conversationAdapter.addConversation(req,res,next)
})
router.get('/',(req: Request,res: Response,next: NextFunction)=>{
    conversationAdapter.getConversation(req,res,next)
})

export default router