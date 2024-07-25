import { IReportRepository } from "../../interface/repository/IReportRepository"

export const completeReport = async(
    reportRepository:IReportRepository
)=>{
    try {
        const reportData = await reportRepository.findReport()
        if(reportData){
            return {
                status:200,
                success:true,
                data:reportData,
                message:'all reports'
            }
        }
    } catch (error) {
        throw error
    }
}