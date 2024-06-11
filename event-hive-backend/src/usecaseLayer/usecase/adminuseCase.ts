// import { UserRepository } from '../../infrastructureLayer/database/repository/userRepository';
import { IAdminRepository } from "../interface/repository/IadminRepository";
import { IUserRepository } from "../interface/repository/IuserRepository";
import IHashPassword from "../interface/services/IhashPassword";
import Ijwt from "../interface/services/Ijwt";
import { loginAdmin } from './admin/loginAdmin';
import { getUsers } from "./admin/getUsers";
import { blockUnblock } from "./admin/blockUser";
import { S3Client } from "@aws-sdk/client-s3";
import { Is3bucket } from '../interface/services/Is3Services';
export class AdminUseCase {
    private readonly adminRepository : IAdminRepository;
    private readonly userRepository : IUserRepository;
    private readonly bcrypt : IHashPassword;
    private readonly jwt : Ijwt;
    private readonly s3Service:Is3bucket;
    private readonly s3:S3Client;
    constructor(
        adminRepository: IAdminRepository,
        userRepository: IUserRepository,
        bcrypt: IHashPassword,
        jwt: Ijwt,
        s3service:Is3bucket,
        s3:S3Client
    ){
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.bcrypt = bcrypt 
        this.jwt =jwt
        this.s3Service=s3service
        this.s3=s3
    }

    async loginAdmin({email,password}:{email:string,password:string}){
        return loginAdmin(
            this.adminRepository,
            this.bcrypt,
            this.jwt,
            email,
            password
        )
    }
    async findAllUsers(){
        return getUsers(
            this.s3Service,
            this.s3
        );
    }
    async blockUnblock(_id:string){
        return blockUnblock(
            this.userRepository,
            _id
        )
    }
}