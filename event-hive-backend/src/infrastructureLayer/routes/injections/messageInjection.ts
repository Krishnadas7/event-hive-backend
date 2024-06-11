import { MessageAdapter } from "../../../controllerLayer/messageAdapter";
import MessageModel from "../../database/model/messageModel";
import { MessageUseCase } from "../../../usecaseLayer/usecase/messageuseCase";
import { MessageRepository } from "../../database/repository/messageRepository";

const messageRepository = new MessageRepository(MessageModel)

const messageusecase = new MessageUseCase(messageRepository)

const messageAdapter = new MessageAdapter(messageusecase)
export{messageAdapter}