import jwt from 'jsonwebtoken'
import Ijwt from '../../usecaseLayer/interface/services/Ijwt'
import UserModel from '../database/model/userModel'
class JwtPassword implements Ijwt{


     async createJWT(userid: string, email: string, role: string, first_name: string): Promise<{ accessToken: string, refreshToken: string }> {
            const accessTokenKey : any = process.env.ACCESS_TOKEN_KEY
            const refreshTokenKey : any = process.env.REFRESH_TOKEN_KEY
            
            if(accessTokenKey && refreshTokenKey){
            const accessToken: string = jwt.sign(
                { id: userid, email: email, role: role, name: first_name },
                accessTokenKey,
                { expiresIn: '15m' } // Adjust as needed
            );
             
            const refreshToken: string = jwt.sign(
                { id: userid },
                refreshTokenKey,
                { expiresIn: '30d' } // Adjust as needed
            );
        //     const user = await UserModel.findOne({email})
        //    console.log('user from jwt service',user);
           
        //     if (user) {
        //         user.refreshToken = refreshToken;
        //         try {
        //             await user.save();
        //             // const userFromDB = await UserModel.findOne({ email });
        //         } catch (error) {
        //             throw error;
        //         }
        //     } else {
        //         console.log('User not found with email:', email);
        //     }
           
            
            return { accessToken, refreshToken };
            }
            throw new Error('token is not created')
    }
}
export default JwtPassword