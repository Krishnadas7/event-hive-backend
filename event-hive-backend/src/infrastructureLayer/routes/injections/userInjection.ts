import { UserAdapter } from "../../../controllerLayer/userAdapter";
import { UserUseCase } from "../../../usecaseLayer/usecase/useruseCase";
import UserModel from "../../database/model/userModel";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from '../../services/bcrypt'
import Nodemailer from "../../services/nodemailer";
import JwtPassword from "../../services/jwt";
import RequestValidator from "../../services/validateRepository";
console.log('injection pageee');
import {s3} from '../../config/awsS3'
import { S3services } from "../../services/s3services";

const userRepository = new UserRepository(UserModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const nodemailer = new Nodemailer()
const requestValidator=new RequestValidator()
const s3service = new S3services()
const userusecase = new UserUseCase(
    userRepository,
    bcrypt,
    nodemailer,
    jwt,
    requestValidator,
    s3service,
    s3,

)
const userAdapter = new UserAdapter(userusecase)

export {userAdapter}