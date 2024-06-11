import { AdminAdapter } from "../../../controllerLayer/adminAdapter";
import { AdminUseCase } from "../../../usecaseLayer/usecase/adminuseCase";
import AdminModel from "../../database/model/adminModel";
import UserModel from "../../database/model/userModel";
import { AdminRepository } from "../../database/repository/adminRepository";
import { UserRepository } from "../../database/repository/userRepository";
import Encrypt from "../../services/bcrypt";
import JwtPassword from "../../services/jwt";
import { S3services } from "../../services/s3services";
import {s3} from '../../config/awsS3'

const adminRepository = new AdminRepository(AdminModel)
const userRepository = new UserRepository(UserModel)
const bcrypt = new Encrypt()
const jwt = new JwtPassword()
const s3service = new S3services()
const adminusecase = new AdminUseCase(
    adminRepository,
    userRepository,
    bcrypt,
    jwt,
    s3service,
    s3,
)
const adminAdapter = new AdminAdapter(adminusecase)

export {adminAdapter,adminusecase}
