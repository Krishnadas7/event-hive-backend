import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { IUser } from '../../domainLayer/user';
import UserModel from '../database/model/userModel';

declare global {
    namespace Express {
      interface Request {
        user?: IUser ; // Define user property
      }
    }
  }

class AuthMiddleware {
    static async protectUser(req: Request, res: Response, next: NextFunction):Promise<void> {
        const userRepository = new UserRepository(UserModel);

        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        console.log('token is misslewarr',token);
        
        if (!token) {
            res.status(401).send('Not authorized, no token');
        }

        // Get the access token secret from your config or environment variables

        const accessTokenSecret = process.env.ACCESS_TOKEN_KEY as string
        
        const decoded : any =jwt.verify(token, accessTokenSecret,(err:any)=>{
          // console.log('token is expired');
          return res.status(401).json({success:false,message:"token is expired"})
          
        })
        if(decoded){
          console.log('token is verified');
        }else{
          console.log('its okay');
          
        }
         
            // Check if the user exists
            const user: any = await userRepository.findUser(decoded.email);
            console.log('middleware user',user);
            
            if (!user) {
               
            }
            // Attach the user to the request for further use
            req.user = user;
            next(); // Pass the user to the next middleware
        
    }
}

export default AuthMiddleware;
