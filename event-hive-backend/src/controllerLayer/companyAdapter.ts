import { Next,Res,Req } from "../infrastructureLayer/types/expressTypes";
import { CompanyUseCase } from "../usecaseLayer/usecase/companyuseCase";

export class CompanyAdapter{
    private readonly companyusecase : CompanyUseCase;
    constructor(companyusecase:CompanyUseCase){
        this.companyusecase=companyusecase
    }

    async createCompany(req: Req,res: Res,next : Next){
        try {
            console.log(req.body,'from create company')
            const newCompany = await this.companyusecase.createCompany(req.body)
           
            if(newCompany){
               res.status(newCompany.status).json({
                success:newCompany.success,
                message:newCompany.message,
                company:newCompany.data
               })
            }else{
              res.status(500).json({
                success:false,
                message:'failed to create company',
                company:null
              })
            }
        } catch (error) {
            next(error)
        }
    }
    async companyLogin(req: Req,res: Res,next: Next){
        try {
            console.log('body from company login',req.body)
            const company = await this.companyusecase.companyLogin(req.body)
            if(company){
                res.cookie("companyAccessToken", company.companyAccessToken, {
                    httpOnly:true,
                    secure:true,
                    sameSite: "strict",
                    maxAge:  900000
                });
                    res.cookie("companyRefreshToken", company.companyRefreshToken, {
                        httpOnly: true,
                        secure:true,
                        sameSite: "strict",
                        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days for refreshToken
                    });
            }
            res.status(company.status).json({
                success: company.success,
                data: company.data,
                message: company.message,
                companyAccessToken:company.companyAccessToken,
                companyRefreshToken:company.companyRefreshToken
            });
        } catch (error) {
            next(error)
        }
    }
    async sendEmailforCompany(req: Req,res: Res,next: Next){
        try {
            const sendEmail = await this.companyusecase.sendEmailforCompany(req.body)
            if(sendEmail){
                res.status(sendEmail.status).json({
                    success:sendEmail.success,
                    message:sendEmail.message,
                })
            }
        } catch (error) {
            next(error)
        }
    }
    async getCompanyProfile(req: Req,res: Res,next: Next){
      try {
        const token = req.cookies.companyAccessToken
        console.log(token)
        const companyData = await this.companyusecase.getCompanyData(token)
        res.status(companyData.status).json({
            success:companyData.success,
            message:companyData.message,
            data:companyData.data
        })
      } catch (error) {
         next(error)
      }
    }
    async companyProfileUpdate (req: Req,res: Res,next: Next){
        try {
            const companyLogo = req.file
            const obj:any = {
             company_name:req.body.company_name,
             company_email:req.body.company_email,
             company_address:req.body.company_address,
             state:req.body.state,
             postal_code:req.body.postal_code,
             country:req.body.country,
             company_website:req.body.company_website,
             locality:req.body.locality,
             company_description:req.body.company_description,
             contact_personname:req.body.contact_personname,
             contact_personphone:req.body.contact_personphone,
             industry_type:req.body.industry_type,
             companyLogo:companyLogo,
             token:req.body.token
            }
         const profileUpdate = await this.companyusecase.companyProfileUpdate(obj)
         res.status(profileUpdate.status).json({
            success:profileUpdate.success,
            message:profileUpdate.message,
            data:profileUpdate.data
         })
        } catch (error) {
            next(error)
        }
          

    }
    async getAllCompany(req:Req,res:Res,next:Next){
        try {
            const companies = await this.companyusecase.getAllCompany()
            if(companies){
                res.status(companies.status).json({
                    success:companies.success,
                    message:companies.message,
                    data:companies.data
                 })
            }
          
        } catch (error) {
            next(error)
        }
    }
    async blockCompany(req: Req,res : Res, next: Next){
        try{
            const companyId = req.body.companyId
      const blocked:any = await this.companyusecase.blockCompany(companyId)
      res.status(blocked.status).json({
        success:blocked.success,
      })
        }catch(error){
            next(error)
        }
    }
}