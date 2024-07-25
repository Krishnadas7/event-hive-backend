import { EventAdapter } from "../../../controllerLayer/eventAdapter";
import EventModel from "../../database/model/eventModel";
import { EventUseCaase } from "../../../usecaseLayer/usecase/eventuseCase";
import { S3services } from "../../services/s3services";
import { EventRepository } from "../../database/repository/eventRepository";
import Nodemailer from "../../services/nodemailer";
import {s3} from '../../config/awsS3'
import  Redis from "../../services/redis";

const eventRepository = new EventRepository(EventModel)

const redis = new Redis()
const s3service = new S3services()
const nodemailer = new Nodemailer()
const eventusecase = new EventUseCaase(
    eventRepository,
    redis,
    s3service,
    s3,
    nodemailer
)
const eventAdapter = new EventAdapter(eventusecase)
export {eventAdapter}