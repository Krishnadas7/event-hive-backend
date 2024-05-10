import mongoose,{Document,Model,Schema} from "mongoose";
import { IUser } from "../../../domainLayer/user";

const userSchema: Schema = new Schema<IUser & Document>(
    {
        first_name:{
            type:String,
        },
        last_name:{
            type:String,
        },
        email:{
            type:String,
            required:true,
        },
        mobile:{
            type:String,
            default:''
        },
        is_block:{
            type:Boolean,
            default:false
        },
        is_verified:{
            type:Boolean,
            default:false
        },
        place:{
            type:String,
        },
        age:{
            type:Number
        },
        qualification:{
            type:String
        },
        password:{
            type:String,
            required:true
        },
        refreshToken:{
            type:String
        }
    },{
        timestamps:true
    }
)

const UserModel : Model<IUser & Document> = mongoose.model<IUser & Document>('User',userSchema)
export default UserModel