import { ICompanyRepository } from "../interface/repository/IcompanyRepository";
import IHashPassword from "../interface/services/IhashPassword";
import Ijwt from "../interface/services/Ijwt";
import { createCompany } from "./company/createCompany";
import { companyLogin } from "./company/companyLogin";
import INodemailer from "../interface/services/Inodemailer";
import { IRedis } from "../interface/services/Iredis";
import { sendEmailforCompany } from "./company/sendEmailforCompany";
import { getAllCompany } from "./company/getAllCompany";
import { getcompanyData } from "./company/getCompanyData";
import { companyProfileUpdate } from "./company/companyProfileUpdate";
import { Is3bucket } from '../interface/services/Is3Services';
import { S3Client } from '@aws-sdk/client-s3';
import { blockCompany } from "./company/blockCompany";
import { companyRefreshToken } from "./company/companyRefreshToken";

export class CompanyUseCase{
 private readonly  companyRepository : ICompanyRepository;
 private readonly  bcrypt : IHashPassword;
 private readonly jwt : Ijwt;
 private readonly nodemailer: INodemailer;
 private readonly redis: IRedis
 private readonly s3Service:Is3bucket;
 private readonly s3:S3Client;
 constructor(
    companyRepository:ICompanyRepository,
    bcrypt:IHashPassword,
    jwt:Ijwt,
    nodemailer:INodemailer,
    redis:IRedis,
    s3service:Is3bucket,
    s3:S3Client
 ){
    this.companyRepository=companyRepository,
    this.bcrypt=bcrypt,
    this.jwt=jwt,
    this.nodemailer=nodemailer,
    this.redis= redis,
    this.s3Service=s3service
    this.s3=s3
 }
 async createCompany({
   otp
 }:{
   otp:string
 }) {
   console.log(otp,'from company usecase')
    return createCompany(
        this.companyRepository,
        this.bcrypt,
        this.redis,
        otp
    )
 }
 async companyLogin({
    company_email,
    password
 }:{
    company_email:string;
    password:string;
 }){
    return companyLogin(
        this.companyRepository,
        this.bcrypt,
        this.jwt,
        company_email,
        password
    )
 }
 async sendEmailforCompany({
   company_name,
   company_email,
   password,
   company_website,
   company_address,
   industry_type,
   company_description
 }:{
   company_name:string;
    company_email:string;
    password:string;
    company_website:string;
    company_address:string;
    industry_type:string;
    company_description:string;
 }){
   return sendEmailforCompany(
      this.companyRepository,
      this.bcrypt,
      this.nodemailer,
      this.redis,
      company_name,
      company_email,
      password,
      company_website,
      company_address,
      industry_type,
      company_description
   )
 }
 async getCompanyData(token:string){
   return getcompanyData(
      this.companyRepository,
      token
   )
 }
 async companyProfileUpdate({
   company_name,
   company_email,
   company_address,
   state,
   postal_code,
   country,
   company_website,
   locality,
   company_description,
   contact_personname,
   contact_personphone,
   industry_type,
   companyLogo,
   token
 }:{  
   company_name: string;
   company_email: string;
   company_address: string;
   state: string;
   postal_code: string;
   country: string;
   company_website: string;
   locality: string;
   company_description: string;
   contact_personname: string;
   contact_personphone: string;
   industry_type: string;
   companyLogo:Express.Multer.File;
   token:string;
 }){
  console.log('token ',token);
   return companyProfileUpdate(
     this.companyRepository,
     this.s3Service,
     this.s3,
     company_name,
   company_email,
   company_address,
   state,
   postal_code,
   country,
   company_website,
   locality,
   company_description,
   contact_personname,
   contact_personphone,
   industry_type,
   companyLogo,
   token
   )
 }
 async getAllCompany(){
  return getAllCompany(
    this.companyRepository,
    this.s3Service,
     this.s3,

  )
 }
 async blockCompany(
  companyId:string
 ){
  return blockCompany(
    this.companyRepository,
    companyId,
   
  )
 }
 async companyRefreshToken(incomingRefreshToken:string){
    return companyRefreshToken(
      this.companyRepository,
      this.jwt,
      incomingRefreshToken
    )
 }
  
}