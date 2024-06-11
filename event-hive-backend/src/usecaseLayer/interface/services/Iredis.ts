import { ICompany } from "../../../domainLayer/company";

export interface IRedis {
    dataStoringRedis(obj:any):Promise<string>;
    getStoredData(userData:string):Promise<ICompany>;
}