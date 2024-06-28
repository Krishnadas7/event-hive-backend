import { createClient } from "redis";
import { IRedis } from "../../usecaseLayer/interface/services/Iredis";
import { ICompany } from "../../domainLayer/company";
// const redisClient = createClient();
import { redisClient } from "../config/redis";

 class Redis implements IRedis{
     async dataStoringRedis(obj: any): Promise<string> {
        try {
            //  const redisClient = createClient();
            //  redisClient.on('error', (err) => console.error('Redis Client Error', err));
            //  redisClient.connect().catch(console.error);
             redisClient.setEx('companyData',300,JSON.stringify({...obj}))
             const data:any = await redisClient.get(obj.company_name)
             return 'data stored in redis'
        } catch (error) {
            throw new Error('failed to storing data on redis')
        }
       
    }
    async getStoredData(userData:string):Promise<ICompany> {
     const data:any =await redisClient.get(userData)
      const res= JSON.parse(data)
      return res
    }
}
export default Redis