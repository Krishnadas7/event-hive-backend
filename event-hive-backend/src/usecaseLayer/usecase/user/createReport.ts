import { IReport,IReportItem } from "../../../domainLayer/report";
import ErrorResponse from "../../handler/errorResponse";
import { IReportRepository } from "../../interface/repository/IReportRepository";

export const createReport = async (
    userEmail:string,
    report:string,
    reportRepository:IReportRepository
) =>{
   try {
    let obj  = {
       
            userEmail,
            report
         
      };
     const reportData = await reportRepository.createReport(obj)
     if(reportData){
        return {
            status : 200,
            success : true,
            message : 'your report receiver our website',
            data:reportData
          }
     }
     throw ErrorResponse.badRequest('wrong in report')
   } catch (error) {
      throw error
   }
}