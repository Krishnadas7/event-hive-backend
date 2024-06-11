import mongoose,{Document,Model,Schema} from "mongoose";
import { IConversation } from "../../../domainLayer/conversation";

const ConversationSchema :Schema = new Schema<IConversation & Document>(
  {
    members: {
      type: [String],
    },
    unreadCount: {
      type: Map,
      of: Number,
      default: new Map(),
    },
  },
  { timestamps: true }
);
const conversationModel : Model<IConversation & Document> = mongoose.model<IConversation & Document>('Conversation',ConversationSchema)
export default conversationModel


