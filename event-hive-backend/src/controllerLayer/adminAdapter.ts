import { Next,Res,Req } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";


export class AdminAdapter{
    private readonly adminusecase: AdminUseCase;
    constructor(
        adminusecase:AdminUseCase
    ){
        this.adminusecase = adminusecase
    }

    async loginAdmin(req:Req,res:Res,next:Next){
        try {
            const user = await this.adminusecase.loginAdmin(req.body);

            user  && res.cookie('adminjwt',user,{
                httpOnly:true,
                sameSite:"strict",
                maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            })
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message:user.message
            })
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req:Req,res:Res,next:Next){
        try {
            const user = await this.adminusecase.findAllUsers();

            user && res.status(user.status).json({
                success:user.success,
                data:user.data
            })
        } catch (error) {
            next(error)
        }
    }
    async blockUnblock(req:Req,res:Res,next:Next){
        try {
            const _id = req.query._id as string;
            console.log('iddddddddd',_id);
            
            const user = await this.adminusecase.blockUnblock(_id)
            user && 
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message: user.message,
            })
        } catch (error) {
            next(error)
        }
    }
}