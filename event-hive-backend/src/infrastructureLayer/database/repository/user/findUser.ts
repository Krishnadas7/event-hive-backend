import UserModel from "../../model/userModel";

export const findUser = async(
    email:string,
    userModels: typeof UserModel
)=>{
    try {
        // console.log('in user repository',email);
        const userExist = await userModels.findOne({email:email});
        // console.log(userExist);
        return userExist
        
    } catch (error) {
        throw error
    }
}