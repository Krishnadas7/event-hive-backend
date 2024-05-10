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

        const token :any= req.cookies?.userAccessToken || req.header("Authorization")?.split(' ')[1]
        console.log('accesstoken ',token);
        
        if (!token) {
            res.status(401).json({message:'Not authorized, no token'});
        }

        // Get the access token secret from your config or environment variables

        const accessTokenSecret = process.env.ACCESS_TOKEN_KEY as string
        console.log('accesskeyy',accessTokenSecret);
        
        try {
          
        
        const decoded : any = jwt.verify(token, accessTokenSecret)

        // console.log('decoded -----',decoded.id);
        
        
         
            // Check if the user exists
            const user: any = await UserModel.findOne({email:decoded.email});
            
            if (!user) {
               res.status(401).json({ error: 'Unauthorized3' });
            }
            // Attach the user to the request for further use
            req.user = user;
            next(); // Pass the user to the next middleware
          } catch (error) {
            // console.error(error);
            res.status(401).json({ error: 'Unauthorized' });
          }
    }
}

export default AuthMiddleware;
