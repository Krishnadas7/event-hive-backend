import { IUser } from "../../../domainLayer/user";

export interface StoreData{
    _id: string;
  name?: string;
  first_name?:string;
  email : string;
  token?:string;
}
export interface IResponse<T = StoreData | string>{
  status : number,
  success : boolean,
  message ?: string,
  data?: T,
  userAccessToken?:any,
  userRefreshToken? : any

}

export interface IUserResponse<T = IUser|IUser[]|string>{
  status:number,
  success:boolean,
  message?:string,
  data?:T,
  token?:string
}

export interface IforgotPassword {
  email : string;
  password : string
}