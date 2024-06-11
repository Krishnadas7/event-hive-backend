import UserModel from "../../model/userModel";

export const getRandomUser = async(
    userId:string,
    userModels: typeof UserModel
)=>{
    try {
        console.log('in user repository',typeof userId);
        const userExist = await userModels.findOne({_id:userId});
        // console.log(userExist);
        return userExist
        
    } catch (error) {
        throw error
    }
}