import { IReport,IReportItem } from "../../../domainLayer/report";

export interface IReportRepository{
    createReport(report:IReportItem):Promise<boolean>;
    findReport():Promise<IReport[]>
}