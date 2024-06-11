import { Next,Res,Req } from "../infrastructureLayer/types/expressTypes";
import { AdminUseCase } from "../usecaseLayer/usecase/adminuseCase";
// import { AdminUseCase } from "../usecaseLayer/usecase/adminUseCase";

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
             if(user){
             res.cookie('adminAccessToken',user.adminAccessToken,{
                httpOnly:true,
                secure:true,
                sameSite: "strict",
                maxAge:  900000
            })
            .cookie('adminRefreshToken',user.adminRefreshToken,{
                httpOnly: true,
                secure:true,
                sameSite: "strict",
                maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
            })
            res.status(user.status).json({
                success: user.success,
                data: user.data,
                message:user.message,
                adminAccessToken:user.adminAccessToken,
                adminRefreshToken:user.adminRefreshToken
            })
        }
        } catch (error) {
            next(error)
        }
    }

    async getUsers(req:Req,res:Res,next:Next){
        try {
            const user = await this.adminusecase.findAllUsers();
           console.log('users===================',user)
             res.status(user.status).json({
                success:user.success,
                data:user.data,
                message:user.message
            })
        } catch (error) {
            console.log('from error',error);
            
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