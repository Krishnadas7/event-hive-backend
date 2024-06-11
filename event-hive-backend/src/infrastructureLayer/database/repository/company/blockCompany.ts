import CompanyModel from "../../model/companyModel";

export const blockCompany = async (
    companyId:string,
    companyModel:typeof CompanyModel
) =>{
  try {
    const companyBlocked:any = await companyModel.findOne({_id:companyId})
    companyBlocked.is_block=!companyBlocked?.is_block
    companyBlocked.save()
    return true
  } catch (error) {
    throw error
  }
}