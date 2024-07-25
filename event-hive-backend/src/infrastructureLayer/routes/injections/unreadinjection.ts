import { UnreadAdapter } from "../../../controllerLayer/unreadAdapter";
import UnreadModel from "../../database/model/unreadModel";
import { UnreadUseCase } from "../../../usecaseLayer/usecase/unreaduseCase";
import { UnreadRepository } from "../../database/repository/unreadRepository";

const unreadRepository = new UnreadRepository(UnreadModel)
const unreadusecase = new UnreadUseCase(unreadRepository)