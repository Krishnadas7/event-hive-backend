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
        res.cookie("userAccessToken", user.userAccessToken, {
          httpOnly:true,
          secure:true,
          sameSite: "strict",
          maxAge:  900000
      });
          res.cookie("userRefreshToken", user.userRefreshToken, {
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
          userAccessToken:user.userAccessToken,
          userRefreshToken:user.userRefreshToken
      });
  } catch (error) {
      // Handle errors
      next(error)
  }
}

async googleAuth (req:Req,res:Res,next:Next){
  try {
    
    const user = await this.userusecase.googleAuth(req.body)
    console.log('userr adapter',user)
    if (user) {
      res.cookie("userAccessToken", user.userAccessToken, {
        httpOnly:true,
        secure:true,
        sameSite: "strict",
        maxAge:  900000
    });
        res.cookie("userRefreshToken", user.userRefreshToken, {
            httpOnly: true,
            secure:true,
            sameSite: "strict",
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
        });
    }
     res.status(user.status).json({
        success:user.success,
        data:user.data,
        message:user.message,
        accessToken:user.userAccessToken,
        refreshToken:user.userRefreshToken
    })
  } catch (error) {
    next(error)
  }
}

  
 async sendOtpForgotPassword(req:Req,res:Res,next:Next){
    try {
        const user = await this.userusecase.sendEmailFogotPassword(req.body);
        res.status(user.status).json({
          success: user.success,
          message: user.message,
        });
      } catch (err) {
        next(err);
      }
 }
 async tokenValidation(req:Req, res:Res ,next: Next){
    try {
      console.log('useradapter===',req.body)
      const token = await this.userusecase.tokenValidation(req.body)
      res.status(token.status).json({
        success:token.success,
        message:token.message
      })
    } catch (error) {
       next(error)
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
  // async tokenValidation(req: Req,res: Res, next: Next) {
  //   const token = await this.userusecase.tokenValidation(req.body)
  // }

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

  async sendEmailForgotPassword(req: Req, res: Res, next: Next) {
    try {
      let userAccessToken = req.cookies.userAccessToken
      const user = await this.userusecase.sendEmailFogotPassword(req.body);
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
          console.log('from forgot password adapter  ',req.body)
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
      async profileImageUpdate( req:Req ,res: Res , next: Next) {
        try {
          console.log(req.file)
          const obj={
            image:req.file,
            id:req.body.id,
            email:req.body.email
          }
          console.log('==============',req.body)
          const imageUpdate = await this.userusecase.uploadProfileImage(obj)

          res.status(imageUpdate.status).json({
            success: imageUpdate.success,
            message: imageUpdate.message,
            data: imageUpdate.data
          });
        } catch (error) {
          next(error)
        }
       

      }
    async resetPassword(req: Req,res: Res,next: Next){
      try {
        const passwordUpdated = await this.userusecase.resetPassword(req.body)
        res.status(passwordUpdated.status).json({
        success:passwordUpdated.success,
        message:passwordUpdated.message
        })
      } catch (error) {
        next(error)
      }
    }
    async profileUpdate(req: Req,res: Res, next: Next){
      const token = req.cookies.userAccessToken
      console.log('user access token from adapter',token)
      const {first_name,last_name,qualification,bio,socialmedialink1,socialmedialink2} = req.body
      let obj={
        first_name,
        last_name,
        qualification,
        bio,
        socialmedialink1,
        socialmedialink2,
        token
      }
      try {
        req.body.token=token
        const profileUpdate = await this.userusecase.updateProfile(obj)
        res.status(profileUpdate.status).json({
          success:profileUpdate.success,
          message:profileUpdate.message,
          data:profileUpdate.data
        })
      } catch (error) {
        next(error)
      }
     
      
    }
    async userData (req: Req,res: Res,next: Next){
      try {
        const email : any= req.query.email 
        const user = await this.userusecase.userData(email)
        res.status(user.status).json({
          success:user.success,
          message:user.message,
          data:user.data
        })
      } catch (error) {
        next(error)
      }
    }
    async getRandomUser (req: Req,res: Res,next: Next){
      try {
        const userId : any= req.query.userId 
        const user = await this.userusecase.getRandomUser(userId)
        res.status(user.status).json({
          success:user.success,
          message:user.message,
          data:user.data
        })
      } catch (error) {
        next(error)
      }
    }

    async getImage(req: Req, res: Res, next: Next) {
      try {
        const email = req.query.email;
        const getUserImage = await this.userusecase.getImage(email as string);
        console.log('res from adapter', getUserImage);
        return res.status(getUserImage.status).json({
          success: getUserImage.success,
          message: getUserImage.message,
          data: getUserImage.data
        });
      } catch (error) {
        return next(error);
      }
    }
    
    // async tokenValidation (req: Req,res: Res, next: Next){
    //   try { 
    //     const validation = await this.userusecase.tokenValidation(req.body)
    //   } catch (error) {
    //     next(error)
    //   }
    // }
}
