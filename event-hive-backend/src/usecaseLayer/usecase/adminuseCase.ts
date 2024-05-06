// import { UserRepository } from '../../infrastructureLayer/database/repository/userRepository';
import { IAdminRepository } from "../interface/repository/IadminRepository";
import { IUserRepository } from "../interface/repository/IuserRepository";
import IHashPassword from "../interface/services/IhashPassword";
import Ijwt from "../interface/services/Ijwt";
import { loginAdmin } from './admin/loginAdmin';
import { getUsers } from "./admin/getUsers";
import { blockUnblock } from "./admin/blockUser";

export class AdminUseCase {
    private readonly adminRepository : IAdminRepository;
    private readonly userRepository : IUserRepository;
    private readonly bcrypt : IHashPassword;
    private readonly jwt : Ijwt;
    constructor(
        adminRepository: IAdminRepository,
        userRepository: IUserRepository,
        bcrypt: IHashPassword,
        jwt: Ijwt
    ){
        this.adminRepository = adminRepository;
        this.userRepository = userRepository;
        this.bcrypt = bcrypt 
        this.jwt =jwt
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
        return getUsers();
    }
    async blockUnblock(_id:string){
        return blockUnblock(
            this.userRepository,
            _id
        )
    }
}