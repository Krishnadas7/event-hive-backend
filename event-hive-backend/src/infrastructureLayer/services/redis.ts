import { IRedis } from "../../usecaseLayer/interface/services/Iredis";
import { ICompany } from "../../domainLayer/company";
import { redisClient } from "../config/redis";

 class Redis implements IRedis{
    //  async dataStoringRedis(obj: any) {
        // try {
        //     //  redisClient.setEx('companyData',300,JSON.stringify({...obj}))
        //     //  const data:any = await redisClient.get(obj.company_name)
        //      return 'data stored in redis'
        // } catch (error) {
        //     throw new Error('failed to storing data on redis')
        // }
    }
    // async getStoredData(userData:string) {
    //  const data =await redisClient.get(userData)
    //  let res
    //  if(data){
    //      res= JSON.parse(data)
    //  }
      
    //   return res
    // }
// }
export default Redis