export interface IUser {
    _id?:string;
    first_name?:string;
    last_name?:string;
    email?:string;
    mobile?:string;
    place?: string;
    age?: string;
    gender?: string;
    qualification?: string;
    is_block?: boolean;
    is_verified?: boolean;
    password:string;
    refreshToken?:string;
    createdAt?: Date;
    updatedAt?: Date;
}