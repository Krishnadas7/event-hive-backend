import { IUserRepository } from '../interface/repository/IuserRepository';
import Ijwt from '../interface/services/Ijwt';
import IHashPassword from '../interface/services/IhashPassword';
import { createUser } from './user/createUser';
import { loginUser } from './user/loginUser';
import { sendOtpFogotPassword } from './user/sendOtpForgotPassword';
import { emailVeification } from './user/emailVerification';
import { forgotPassword } from './user/forgotPassword';
import { verifyEmail } from './user/sendEmail';
import INodemailer from '../interface/services/Inodemailer';
import { IRequestValidator } from '../interface/repository/IvalidareRepository';


export class UserUseCase{
    private readonly userRepository : IUserRepository;
    private readonly bcrypt : IHashPassword;
    private readonly nodemailer: INodemailer;
    private readonly jwt : Ijwt;
    private readonly requestValidator:IRequestValidator;

    constructor(
        userRepository : IUserRepository,
        bcrypt : IHashPassword,
        nodemailer: INodemailer,
        jwt : Ijwt,
        requestValidator:IRequestValidator
    ){ 
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
        this.nodemailer = nodemailer;
        this.jwt = jwt;
        this.requestValidator = requestValidator
    }


    async createUser({
        first_name,
        last_name,
        email,
        password,
        confirm_password,
        mobile
    }:{
        first_name:string,
        last_name:string,
        email:string,
        password:string,
        confirm_password:string,
        mobile:string
    }){
        console.log('infrastructu===userusecasee====1');
        console.log(first_name,last_name,email,mobile,password);
        
        return createUser(
            this.userRepository,
            // this.jwt,
            this.bcrypt,
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            mobile

        )
    }
    async loginUser({
        email,
        password
    }:{
        email:string;
        password:string
    }){
        return loginUser(
            this.requestValidator,
            this.userRepository,
            this.bcrypt,
            this.jwt,
            email,
            password
        )
    }

    async verifyEmail({ first_name, email }: { first_name: string; email: string }) {
        return verifyEmail(this.userRepository, this.nodemailer, first_name, email);
      }

    async emailVeification({ otp, email }: { otp: string; email: string }) {
        return emailVeification(this.nodemailer, otp, email);
    }

    async sendOtpFogotPassword({
     email, 
     name 
        }: { 
         email: string;
         name: string 
        }) {
        return sendOtpFogotPassword(
            this.userRepository,
            this.nodemailer, 
            email,
            name);
    }

    async forgotPassword({
        email,
        password,
      }: {
        email: string;
        password: string;
      }) {
        return forgotPassword(
          this.userRepository,
          this.bcrypt,
          this.jwt,
          email,
          password
        );
      }
}