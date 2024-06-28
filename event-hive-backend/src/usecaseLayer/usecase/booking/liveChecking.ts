import { IBookingRepository } from "../../interface/repository/IbookingRepository";

export const  liveChecking =async (
    bookingRepository:IBookingRepository,
    userId:string
) =>{
    try {
        const live = await bookingRepository.liveChecking(userId)
        
        return {
            status:200,
            success:true,
            message:'datas',
            data:live
        }
    } catch (error) {
        throw error
    }
}