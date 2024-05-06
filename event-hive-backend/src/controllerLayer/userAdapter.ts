import { Next, Res, Req } from "../infrastructureLayer/types/expressTypes";
import { UserUseCase } from "../usecaseLayer/usecase/useruseCase";

export class UserAdapter {
    private readonly userusecase: UserUseCase;

    constructor(userusecase: UserUseCase) {
        this.userusecase = userusecase;
    }

    async createUser(req: Req, res: Res, next: Next) {
      
     try {
         console.log('usercontroller == useradapter == 1');
         const newUser = await this.userusecase.createUser(req.body);
 
         if (newUser ) {
             console.log('New user token:', newUser);
 
            //  res.cookie("userjwt", newUser.token, {
            //      httpOnly: true,
            //      sameSite: "strict", // Prevent CSRF attacks
            //      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days,
            //  });
 
            //  console.log('Cookie set successfully:', res.cookie);
 
             res.status(newUser.status).json({
                 success: newUser.success,
                 message: newUser.message,
                 user: newUser.data,
             });
         } else {
             console.error('Failed to create user or user data is missing.');
             res.status(500).json({
                 success: false,
                 message: 'Failed to create user or user data is missing.',
                 user: null,
             });
         }
     } catch (error) {
         next(error);
     }
 }

 async loginUser(req: Req, res: Res, next: Next) {
  try {
      const user = await this.userusecase.loginUser(req.body);
      console.log('login user error showing ====',user);
      
      if (user) {
        res.cookie("accessToken", user.accessToken, {
          httpOnly:true,
          secure:true,
          sameSite: "strict",
          maxAge:  20*1000
      });
          res.cookie("refreshToken", user.refreshToken, {
              httpOnly: true,
              secure:true,
              sameSite: "strict",
              maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
          });
      }

      res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
          accessToken:user.accessToken,
          refreshToken:user.refreshToken
      });
  } catch (error) {
      // Handle errors
      next(error)
  }
}

  
 async sendOtpForgotPassword(req:Req,res:Res,next:Next){
    try {
        const user = await this.userusecase.sendOtpFogotPassword(req.body);
        res.status(user.status).json({
          success: user.success,
          message: user.message,
        });
      } catch (err) {
        next(err);
      }
 }

 async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyEmail(req.body);
      console.log('seremail',user);
      
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      console.log(req.body);
      
      const user = await this.userusecase.emailVeification(req.body);
      console.log('userrrr',user);
      
      user &&
        res.status(user.status).json({
          success: user.success,
          // data: user.data,
          message: user.message,
        });
    } catch (err) {
      
      next(err);
    }
  }

  async sednOtpFogotPassword(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.sendOtpFogotPassword(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
}
    async fogotPassword(req: Req, res: Res, next: Next) {
        try {
          const newUser = await this.userusecase.forgotPassword(req.body);
          newUser &&
            res.cookie("userjwt", newUser, {
              httpOnly: true,
              sameSite: "strict", // Prevent CSRF attacks
              maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            });
    
          res.status(newUser.status).json({
            success: newUser.success,
            message: newUser.message,
            user: newUser.data,
          });
        } catch (err) {
          next(err);
        }
      }
 
}
