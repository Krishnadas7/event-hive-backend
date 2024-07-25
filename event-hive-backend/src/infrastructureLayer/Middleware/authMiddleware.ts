import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from '../database/repository/userRepository';
import { AdminRepository } from '../database/repository/adminRepository';
import { CompanyRepository } from '../database/repository/companyRepository';
import { IUser } from '../../domainLayer/user';
import UserModel from '../database/model/userModel';
import AdminModel from '../database/model/adminModel';
import CompanyModel from '../database/model/companyModel';
import { IAdmin } from '../../domainLayer/admin';
import { ICompany } from '../../domainLayer/company';


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

        const token :string= req.cookies?.userAccessToken || req.header("Authorization")?.split(' ')[1]
        console.log('accesstoken ',token);
        
        if (!token) {
            res.status(401).json({message:'Not authorized, no token'});
        }
        const accessTokenSecret = process.env.ACCESS_TOKEN_KEY as string
        console.log('accesskeyy',accessTokenSecret);
        try {
        const decoded : any = jwt.verify(token, accessTokenSecret)
            const user: IUser|null = await UserModel.findOne({email:decoded.email});
            if (!user) {
               res.status(401).json({ error: 'Unauthorized3' });
            }
            next(); // Pass the user to the next middleware
          } catch (error) {
            res.status(401).json({ error: 'Unauthorized' });
          }
    }
    static async protectAdmin(req: Request, res: Response, next: NextFunction):Promise<void> {
       const adminRepository = new AdminRepository(AdminModel)
       const token : string =req.cookies?.adminAccessToken || req.header("Authorization")?.split(' ')[1]
       if(!token) {
        res.status(401).json({message :'Not authorized , no token'})

       }
       const accessTokenSecret = process.env.ACCESS_TOKEN_KEY as string
       try {
        const decoded : any = jwt.verify(token,accessTokenSecret)
        console.log('decoded form ===========',decoded)
        const user: IAdmin|null = await AdminModel.findOne({_id:decoded.id})
        console.log('usrrrr',user);
        
        if(!user){
          res.status(401).json({ error: 'Unauthorized3' });
        }
        next(); // Pass the user to the next middleware
       } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
       }
    }

    static async protectCompany(req: Request, res: Response, next: NextFunction):Promise<void> {
      const adminRepository = new CompanyRepository(CompanyModel)
      const token : string =req.cookies?.companyAccessToken || req.header("Authorization")?.split(' ')[1]
        console.log('accessToken from comapny middd',token)
      if(!token) {
       res.status(401).json({message :'Not authorized , no token'})

      }
      const accessTokenSecret = process.env.ACCESS_TOKEN_KEY as string
      try {
       const decoded : any = jwt.verify(token,accessTokenSecret)
       console.log('decoded form ===========',decoded)
       const company: ICompany|null = await CompanyModel.findOne({_id:decoded.id})
       console.log('compnyy',company);
       
       if(!company){
         res.status(401).json({ error: 'Unauthorized3' });
       }
       // req.admin = user;
       next(); // Pass the user to the next middleware
      } catch (error) {
       res.status(401).json({ error: 'Unauthorized' });
      }
   }
}

export default AuthMiddleware;
